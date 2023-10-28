"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchVersions = void 0;
const packageJsons_1 = require("./packageJsons");
const errors_1 = require("./errors");
async function fetchVersions(packageName) {
    if (packageName === undefined || packageName === null) {
        throw new errors_1.EmptyInputError('The "packageName" parameter cannot be empty or null.');
    }
    const versions = packageJsons_1.packageJsons
        .filter((packageJson) => packageJson.name == packageName)
        .map((packageJson) => packageJson.version);
    if (versions.length == 0)
        throw new errors_1.NotFoundError(`${packageName}`);
    return versions;
}
exports.fetchVersions = fetchVersions;
