"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchVersions_1 = require("./fetchVersions");
const fetchPackageJson_1 = require("./fetchPackageJson");
const errors_1 = require("./errors");
const solution = async function (packageJson, fetchVersions, fetchPackageJson) {
    if (packageJson == undefined || null) {
        throw new errors_1.EmptyInputError('The "packageJson" parameter cannot be empty or null.');
    }
    if (fetchVersions == undefined || null) {
        throw new errors_1.EmptyInputError('The "fetchVersions" parameter cannot be empty or null.');
    }
    if (fetchPackageJson == undefined || null) {
        throw new errors_1.EmptyInputError('The "name" parameter cannot be empty or null.');
    }
    let result = new Set();
    for (let packageName in packageJson.dependencies) {
        let checkedPackageVersion;
        let checkedPackageJson;
        const semanticVersion = packageJson.dependencies[packageName];
        try {
            checkedPackageVersion = versionSelector(semanticVersion, await fetchVersions(packageName));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                error.cause(`${packageName},${semanticVersion}에 해당되는 버전을 찾을 수 없습니다.`);
                console.log(error.message, error.cause);
            }
            continue;
        }
        try {
            checkedPackageJson = await fetchPackageJson(packageName, checkedPackageVersion);
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                error.cause(`${packageName},${checkedPackageVersion}에 해당되는 packageJson을 찾을 수 없습니다.`);
                console.log(error.message, error.cause);
            }
            continue;
        }
        result.add(nameVersionParing(packageName, checkedPackageVersion));
        result = new Set([
            ...result,
            ...(await solution(checkedPackageJson, fetchVersions, fetchPackageJson)),
        ]);
    }
    return Array.from(result);
};
function nameVersionParing(name, version) {
    return `${name}@${version}`;
}
function versionSelector(semanticVersion, versions) {
    versions.sort((a, b) => b.localeCompare(a));
    if (semanticVersion === "*") {
        return versions[0];
    }
    const [requiredMajor, requiredMinor, requiredPatch] = semanticVersion
        .substring(1)
        .split(".")
        .map(Number);
    if (semanticVersion.startsWith("^")) {
        const filteredVersions = versions.filter((version) => {
            const [major, minor, patch] = version.split(".").map(Number);
            return (major === requiredMajor &&
                (minor > requiredMinor ||
                    (minor === requiredMinor && patch >= requiredPatch)));
        });
        return filteredVersions[0];
    }
    else if (semanticVersion.startsWith("~")) {
        const filteredVersions = versions.filter((version) => {
            const [major, minor, patch] = version.split(".").map(Number);
            return (major === requiredMajor &&
                minor === requiredMinor &&
                patch >= requiredPatch);
        });
        return filteredVersions[0];
    }
    else {
        if (!versions.includes(semanticVersion)) {
            throw new errors_1.NotFoundError(`${semanticVersion}와 일치하는 버전이 존재하지 않습니다.`);
        }
        return semanticVersion;
    }
}
solution({
    name: "firstJSON",
    version: "0.0.1",
    dependencies: {
        secondJSON: "^0.0.1",
        thirdJSON: "^0.0.1",
    },
}, fetchVersions_1.fetchVersions, fetchPackageJson_1.fetchPackageJson).then((result) => console.log(result));
// 중간에 패키지를 찾지 못해도 계속 이터레이션을 반복해서 찾을 수 있는 건 전부 찾게 만들기
// 코드 순서 짤때, 예외처리, 필요한 데이터들 전처리 다 하고 로직 짜기
/*

<순서>

1. 입력 예외처리
2. 입력 받은 객체의 디펜던시 탐색 시작 (for 문 시작)
3. 해당 스트링과 fetchVersions, versionSelector를 통해 version 픽할 수 있는지 체크 -> 실패시 콘솔창에 해당 버전 없다고 밝히고 다음 포문으로 넘어감
4. 위에서 얻은 version과 패키지명을 fetchPackageJson에 넣어 패키지제이슨 객체를 얻는다. -> 실패시 해당 패키지 제이슨 객체가 없다고 밝히고 다음 포문으로 넘어감
5. 3,4 통과시 객체를 결과배열에 추가 (for문 종료)
6. 해당 객체를 다시 솔루션에 넣어서 나온 결과를 기존 배열에 합친다.

*/
