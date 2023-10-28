import { packageJson, packageJsons } from "./packageJsons";
import { NotFoundError, EmptyInputError } from "./errors";

export async function fetchPackageJson(
  name: string,
  version: string
): Promise<packageJson> {
  if (name === undefined || name === null) {
    throw new EmptyInputError('The "name" parameter cannot be empty or null.');
  }
  if (version === undefined || name === null) {
    throw new EmptyInputError(
      'The "version" parameter cannot be empty or null.'
    );
  }

  const result: packageJson | undefined = packageJsons.find((packageJson) => {
    return packageJson.name == name && packageJson.version == version;
  });

  if (result === undefined) {
    throw new NotFoundError(`${name},${version}`);
  } else {
    return result;
  }
}

/* 

<검색 결과가 없을 때 처리 로직>

조건1: 입력된 이름,버전이 존재하지 않다는 사실을 해당 API 사용자가 알 수 있어야 한다.
조건2: 해당 파라미터(이름,버전)를 넘겨줄 수 있어야 함. (V)
조건3: 프로그램이 이 흐름으로 인해 멈추면 안됨. (v)

-> rejct로 가능한지 체크해보기 -> 에러 발생하면 알아서 reject 발생하는 걸로 안다. aysnc 함수의 경우 ㅇㅇ
*/
