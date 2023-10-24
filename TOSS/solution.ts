import { fetchVersions } from "./fetchVersions";
import { fetchPackageJson } from "./fetchPackageJson";
import { packageJson } from "./packageJsons";

const solution = async function(packageJson: packageJson , fetchVersions:(packageName: string) => Promise<string[]>, fetchPackageJson:(name:string, version:string) => any ):Promise<string[]> {
    
    let result: string[] = []

    result.push(nameVersionParing(packageJson.name,packageJson.version))

    for(let packageName in packageJson.dependencies){
        result.push(nameVersionParing(packageName,versionSelector(packageJson.dependencies[packageName],await fetchVersions(packageName))))
        if (fetchPackageJson) {
            result = [...result, ...await solution(fetchPackageJson(packageName,versionSelector(packageJson.dependencies[packageName],await fetchVersions(packageName)))
                , fetchVersions, fetchPackageJson)];
          }
    }

    return result
}


const nameVersionParing = function(name:string,version:string):string {
    return`${name}@${version}`
}

const versionSelector = function(semanticVersion:string, versions: string[]): string{
    return versions[0]
}

solution({
    name: 'firstJSON',
    version: '0.0.1',
    dependencies: {
        'secondJSON': '^0.0.1',
        'thirdJSON': '^0.0.1'
    } 
},fetchVersions,fetchPackageJson).then(value => console.log(value))