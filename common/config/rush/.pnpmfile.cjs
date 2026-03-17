"use strict";

function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies["serialize-javascript"]) {
    const old = pkg.dependencies["serialize-javascript"];
    pkg.dependencies["serialize-javascript"] = "^7.0.3";
    context.log(
      `Overriding serialize-javascript from ${old} to ^7.0.3 in ${pkg.name}`
    );
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
