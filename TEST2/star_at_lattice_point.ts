function solution(input: number[][]) {
  const lattice_points: Point[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const cross_point = find_cross_point(input[i], input[j]);
      if (Number.isInteger(cross_point.x) && Number.isInteger(cross_point.y))
        lattice_points.push(cross_point);
    }
  }

  // n^2 사이즈 배열 도는 거니깐 O(n^2)
  const { x_min, x_max, y_min, y_max } = find_bounding_box(lattice_points);

  const height = y_max - y_min + 1; // y의 범위
  const width = x_max - x_min + 1; // x의 범위

  // 1000 * 1000 사이즈가 최대니깐 10 ^ 6
  const result: string[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ".")
  );

  lattice_points.forEach(
    (lattice_point) =>
      (result[y_max - lattice_point.y][lattice_point.x - x_min] = "*")
  );

  return result;
}

class Point {
  x;
  y;
  constructor([x, y]: [number | string, number | string]) {
    this.x = Number(x);
    this.y = Number(y);
  }
}

function find_cross_point(line1: number[], line2: number[]): Point {
  const [a1, b1, c1] = line1;
  const [a2, b2, c2] = line2;

  const x: number = (b2 * c1 - b1 * c2) / (a2 * b1 - a1 * b2);
  const y: number = (a1 * c2 - a2 * c1) / (a2 * b1 - a1 * b2);

  return new Point([x, y]);
}

function find_bounding_box(lattice_points: Point[]) {
  let x_min = Infinity,
    x_max = -Infinity,
    y_min = Infinity,
    y_max = -Infinity;

  lattice_points.forEach((point) => {
    if (point.x < x_min) x_min = point.x;
    if (point.x > x_max) x_max = point.x;
    if (point.y < y_min) y_min = point.y;
    if (point.y > y_max) y_max = point.y;
  });

  return { x_min, x_max, y_min, y_max };
}

const lines = [
  [2, -1, 4],
  [-2, -1, 4],
  [0, -1, 1],
  [5, -8, -12],
  [5, 8, 12],
];

function lines_generator() {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const lines = new Array(50)
    .fill(0)
    .map(() => [
      getRandomInt(-100000, 100000),
      getRandomInt(-100000, 100000),
      getRandomInt(-100000, 100000),
    ]);
  return lines;
}

function printSolution(result: any) {
  // 각 내부 배열을 문자열로 변환
  const resultString = result.map((row: any) => row.join("")).join("\n");
  console.log(resultString);
}

// solution 함수를 사용해 결과를 계산하고 출력
const solutionResult = solution(lines);
printSolution(solutionResult);
