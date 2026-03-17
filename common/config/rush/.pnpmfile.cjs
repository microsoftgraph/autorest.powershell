"use strict";

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
    // Override exact js-yaml 3.x < 3.14.2
    if (/^3\.(\d+)\.(\d+)$/.test(ver) && ver !== "3.14.2") {
      pkg.dependencies["js-yaml"] = "3.14.2";
      context.log(`Overriding js-yaml from ${ver} to 3.14.2 in ${pkg.name}`);
    }
    // Override js-yaml 4.x < 4.1.1
    if (/^[~^]?4\./.test(ver) && ver !== "4.1.1" && ver !== "^4.1.0") {
      pkg.dependencies["js-yaml"] = "4.1.1";
      context.log(`Overriding js-yaml from ${ver} to 4.1.1 in ${pkg.name}`);
    }
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
