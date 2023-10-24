import { fetchVersions } from "./fetchVersions";
import { fetchPackageJson } from "./fetchPackageJson";
const solution = async function (packageJson, fetchVersions, fetchPackageJson) {
    let result = [];
    result.push(nameVersionParing(packageJson.name, packageJson.version));
    for (let packageName in packageJson.dependencies) {
        result.push(nameVersionParing(packageName, versionSelector(packageJson.dependencies[packageName], await fetchVersions(packageName))));
        if (fetchPackageJson) {
            result = [...result, ...await solution(fetchPackageJson(packageName, versionSelector(packageJson.dependencies[packageName], await fetchVersions(packageName))), fetchVersions, fetchPackageJson)];
        }
    }
    return result;
};
const nameVersionParing = function (name, version) {
    return `${name}@${version}`;
};
const versionSelector = function (semanticVersion, versions) {
    return versions[0];
};
solution({
    name: 'firstJSON',
    version: '0.0.1',
    dependencies: {
        'secondJSON': '^0.0.1',
        'thirdJSON': '^0.0.1'
    }
}, fetchVersions, fetchPackageJson).then(value => console.log(value));
