import { packageJsons } from "./packageJsons";
export async function fetchPackageJson(name, version) {
    let result;
    packageJsons.find((packageJson) => result = (packageJson.name == name && packageJson.version == version) ? packageJson : undefined);
    return result;
}
