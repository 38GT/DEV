import {packageJsons } from "./packageJsons";

export async function fetchVersions(packageName: string):Promise<string[]>{
    let result:string[]=[];
    packageJsons.find(
        (packageJson) => {
            if(packageJson.name == packageName) result.push(packageJson.version)
        }
    )
    return result;
}
