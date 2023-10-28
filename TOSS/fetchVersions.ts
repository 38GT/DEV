import { packageJsons } from "./packageJsons";
import { NotFoundError, EmptyInputError } from "./errors";

export async function fetchVersions(packageName: string): Promise<string[]> {
  if (packageName === undefined || packageName === null) {
    throw new EmptyInputError(
      'The "packageName" parameter cannot be empty or null.'
    );
  }

  const versions: string[] = packageJsons
    .filter((packageJson) => packageJson.name == packageName)
    .map((packageJson) => packageJson.version);

  if (versions.length == 0) throw new NotFoundError(`${packageName}`);
  return versions;
}
