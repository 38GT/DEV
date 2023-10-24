import { packageJson, packageJsons } from "./packageJsons"

export async function fetchPackageJson(name:string, version:string):Promise<packageJson> {
  let result: packageJson;
  packageJsons.find(
    (packageJson) => {
      if(packageJson.name == name && packageJson.version == version) result = packageJson
    }
  )
  if(result == undefined) return new Error(`${name},${version}은 존재하지 않습니다.`))
  return result;
} 
