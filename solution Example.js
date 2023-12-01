async function solution(packageJson, fetchVersions, fetchPackageJson) {
  const versions = {}; //const로 빈 객체에 데이터 저장하는 전략 좋은 것 같음. let사용 안해도 된다.
  await resolveVersion(packageJson);
  return flattenVersions(versions);

  async function resolveVersion(packageJson) {
    //Object.entries 도 배열로 값들을 관리해서 다루기 용이해보인다.
    const packagesToDownload = Object.entries(packageJson.dependencies);

    for (const [packageName, rawSemver] of packagesToDownload) {
      if (!(packageName in versions)) {
        versions[packageName] = {
          matched: new Map(),
          availables: await fetchVersions(packageName).then(sort),
        };
      }
      const { matched, availables } = versions[packageName];
      if (matched.has(rawSemver)) {
        continue;
      }

      const semver = NodeSemver.of(rawSemver);
      const highestPossibleVersion = availables.find((candidate) =>
        semver.canAccept(candidate)
      );
      matched.set(rawSemver, highestPossibleVersion);
      const nextPackageJson = await fetchPackageJson(
        packageName,
        highestPossibleVersion
      );
      await resolveVersion(nextPackageJson);
    }
  }
}

function flattenVersions(versions) {
  const packageNames = Object.keys(versions);
  const lockFile = [];
  for (const packageName of packageNames) {
    const { matched } = versions[packageName];
    const versionCandidates = Array.from(new Set(matched.values()));
    lockFile.push(
      ...versionCandidates.map((version) => `${packageName}@${version}`)
    );
  }
  return lockFile;
}

function sort(rawVersions) {
  return rawVersions
    .map((version) => NodeSemver.of(version))
    .sort(NodeSemver.sort)
    .map((nodeSemver) => nodeSemver.version);
}

class NodeSemver {
  constructor(version, type, major, minor, patch) {
    this.version = version;
    this.type = type;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  static sort(s1, s2) {
    if (s1.major > s2.major) return -1;
    if (s1.major === s2.major) {
      if (s1.minor > s2.minor) return -1;
      if (s1.minor === s2.minor) {
        return s1.patch >= s2.patch ? -1 : 1;
      }
      return 1;
    }
    return 1;
  }

  static of(rawSemver) {
    if (rawSemver === "*") {
      return new NodeSemver(rawSemver, "all", null, null, null);
    }

    let type, version;

    if (rawSemver.startsWith("^")) {
      version = rawSemver.slice(1);
      type = "major";
    } else if (rawSemver.startsWith("~")) {
      version = rawSemver.slice(1);
      type = "minor";
    } else {
      version = rawSemver;
      type = "exact";
    }

    const [major, minor, patch] = version
      .split(".")
      .map((digit) => parseInt(digit));
    return new NodeSemver(version, type, major, minor, patch);
  }

  canAccept(exactVersion) {
    const target = NodeSemver.of(exactVersion);
    if (target.type !== "exact") {
      throw new Error(
        `Cannot calculate acceptability with version: ${exactVersion}`
      );
    }

    switch (this.type) {
      case "all":
        return true;
      case "exact":
        return exactVersion === this.version;
      case "major":
        // major는 같아야 하고
        return target.major === this.major &&
          // minor가 같은 경우 patch를 비교
          target.minor === this.minor
          ? target.patch >= this.patch
          : target.minor > this.minor;
      case "minor":
        return (
          target.major === this.major &&
          target.minor === this.minor &&
          target.patch >= this.patch
        );
    }
    return false;
  }
}

module.exports.solution = solution;
