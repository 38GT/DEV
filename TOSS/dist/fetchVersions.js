import { packageJsons } from "./packageJsons";
export async function fetchVersions(packageName) {
    let result = [];
    packageJsons.find((packageJson) => {
        if (packageJson.name == packageName)
            result.push(packageJson.version);
    });
    return result;
}
