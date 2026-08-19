"use strict";

// Packages whose versions are force-overridden by readPackage below. When Rush re-resolves
// against the private Azure Artifacts feed, the feed emits public registry.npmjs.org tarball
// URLs for these overridden versions, and pnpm would then fetch them directly from public npm.
// Under 1ES/CFSClean network isolation public npm is blocked, so afterAllResolved rewrites the
// tarball URLs of ONLY these packages to the private feed.
const OVERRIDE_PACKAGES = ["serialize-javascript", "js-yaml"];

// The calling pipeline sets MG_PNPM_TARBALL_REGISTRY to the registry base URL to redirect to
// (the private feed). Absent/empty => rewrite disabled (e.g. local dev against public npm).
const TARBALL_REGISTRY = (process.env.MG_PNPM_TARBALL_REGISTRY || "").trim();

const PUBLIC_NPM_PREFIXES = [
  "https://registry.npmjs.org/",
  "http://registry.npmjs.org/",
  "https://registry.npmjs.com/",
];

function feedBase() {
  return TARBALL_REGISTRY.endsWith("/") ? TARBALL_REGISTRY : TARBALL_REGISTRY + "/";
}

// Extract the package name from a pnpm v6 lockfile key, e.g.
//   "/serialize-javascript@7.0.4" -> "serialize-javascript"
//   "/@types/js-yaml@3.12.1"      -> "@types/js-yaml"
//   "/js-yaml@4.1.1"             -> "js-yaml"
function packageNameFromKey(key) {
  const m = /^\/((?:@[^/]+\/)?[^@]+)@/.exec(key);
  return m ? m[1] : null;
}

function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies["serialize-javascript"]) {
    const old = pkg.dependencies["serialize-javascript"];
    pkg.dependencies["serialize-javascript"] = "^7.0.3";
    context.log(
      `Overriding serialize-javascript from ${old} to ^7.0.3 in ${pkg.name}`
    );
  }
  if (pkg.dependencies && pkg.dependencies["js-yaml"]) {
    const ver = pkg.dependencies["js-yaml"];
    // Override exact js-yaml 3.x < 3.15.1
    if (/^3\.(\d+)\.(\d+)$/.test(ver) && ver !== "3.15.1") {
      pkg.dependencies["js-yaml"] = "3.15.1";
      context.log(`Overriding js-yaml from ${ver} to 3.15.1 in ${pkg.name}`);
    }
    // Override js-yaml 4.x < 4.1.1
    if (/^[~^]?4\./.test(ver) && ver !== "4.1.1" && ver !== "^4.1.0") {
      pkg.dependencies["js-yaml"] = "4.1.1";
      context.log(`Overriding js-yaml from ${ver} to 4.1.1 in ${pkg.name}`);
    }
  }
  return pkg;
}

// Rewrite the tarball URLs of the override packages to the private feed. pnpm only runs
// afterAllResolved when resolution actually happens (rush update / non-frozen install); it is
// skipped on frozen `rush install`, which is fine because frozen installs consume the committed
// lockfile and never re-fetch these tarballs from public npm.
function afterAllResolved(lockfile, context) {
  if (!TARBALL_REGISTRY) {
    return lockfile;
  }
  const log = context && typeof context.log === "function" ? context.log : function () {};
  const base = feedBase();
  const packages = lockfile.packages || {};
  let count = 0;
  for (const key of Object.keys(packages)) {
    const pkg = packages[key];
    const tarball = pkg && pkg.resolution && pkg.resolution.tarball;
    if (!tarball) {
      continue;
    }
    const name = packageNameFromKey(key);
    if (OVERRIDE_PACKAGES.indexOf(name) === -1) {
      continue;
    }
    for (const prefix of PUBLIC_NPM_PREFIXES) {
      if (tarball.indexOf(prefix) === 0) {
        pkg.resolution.tarball = base + tarball.slice(prefix.length);
        count++;
        log(`Rewrote ${name} tarball ${tarball} -> ${pkg.resolution.tarball}`);
        break;
      }
    }
  }
  if (count > 0) {
    log(`Rewrote ${count} tarball URL(s) to ${base}`);
  }
  return lockfile;
}

module.exports = { hooks: { readPackage, afterAllResolved } };
