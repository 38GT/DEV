const board = [
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
];

// [type, r1, c1, r2, c2, degree]

const skill = [
  [1, 0, 0, 3, 4, 4],
  [1, 2, 0, 2, 3, 2],
  [2, 1, 0, 3, 1, 2],
  [1, 0, 1, 3, 3, 1],
];

//1-dim example

const board1 = [0, 1, 2, 3, 4];
const skill1 = [0, 3, 3, 3, 0];

/*

[0,3,3,3,0] -> 각 위치별로 더해줘야할 값 
[0,3,0,0,-3] -> 각 위치별로 처음 위치부터 현재 위치까지 전체에 더해줄 값

const sk1 = [0,3,3,3,0]
const sk2 = [0,3,0,0,-3]

[type, start, end, degree]

[2,0,5,1]


let result;


// propotional to board size 
for ( let i = 0; i < board.length; i ++){
  result.push(board1[i] + sk1[i])
}

*/

//bd = N x M SK = S
const sk = [
  [1, 0, 3, 5],
  [2, 2, 4, 3],
  [1, 5, 7, 2],
  [2, 3, 6, 4],
  [1, 1, 2, 3],
  [2, 4, 5, 2],
  [1, 3, 5, 4],
  [2, 0, 2, 1],
  [1, 6, 8, 3],
  [2, 7, 9, 2],
];

const bd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const getSkSum = (sk) => {
  const prefix = Array(bd.length).fill(0); // N x M
  for (let action of sk) {
    // S
    const [type, start, end, degree] = action;
    const value = type === 2 ? degree : -1 * Number(degree);
    prefix[start] += value; // 이 부분에서 bd사이즈에 무관하게 처리 가능 -> 이건 값의 연속성을 이용해서 시간복잡도를 줄인거임 누적합으로 줄인게 아니라
    if (end < bd.length - 1) {
      prefix[end + 1] -= value;
    }
  }
  return prefix;
};

const solution = (bd, sk) => {
  //S
  const prefix = getSkSum(sk);
  let cumulative = 0;
  //N x M
  for (let i = 0; i < prefix.length; i++) {
    cumulative += prefix[i];
    bd[i] += cumulative;
  }
  return bd;
};

console.log(solution(bd, sk));
