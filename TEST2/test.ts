// 삼각 달팽이

// 1 <= n <= 1000

function triangle_snale(n: number) {
  const snail_tree = Array.from({ length: n + 2 }, (_, i) =>
    Array.from({ length: n + 2 }, (_, j) =>
      i === n + 1 || i === 0 || j === n + 1 || j === 0 ? -1 : 0
    )
  );
  return snail_tree;
}

class SnailedMatrix {
  counter = 1;
  array;
  current_position: [number, number] = [1, 1];
  constructor(array: number[][]) {
    this.array = array;
  }

  start() {
    this.vertical_move();
  }

  vertical_move() {
    const [y, x] = this.current_position;
    this.array[y][x] = this.counter;
    this.counter++;
    if (this.counter === (5 * 6) / 2) return;
    if (this.array[y + 1][x] == -1) {
      this.horizontal_move();
    } else {
      this.current_position = [y + 1, x];
      this.vertical_move();
    }
  }

  horizontal_move() {
    const [y, x] = this.current_position;
    this.array[y][x] = this.counter;
    this.counter++;
    if (this.counter === (5 * 6) / 2) return;
    if (this.array[y][x + 1] == -1) {
      this.diagonal_move();
    } else {
      this.current_position = [y, x + 1];
      this.horizontal_move();
    }
  }
  diagonal_move() {
    const [y, x] = this.current_position;
    this.array[y][x] = this.counter;
    this.counter++;
    if (this.counter === (5 * 6) / 2) return;
    if (this.array[y - 1][x - 1] == -1) {
      this.vertical_move();
    } else {
      this.current_position = [y - 1, x - 1];
      this.diagonal_move();
    }
  }
}

const answer = triangle_snale(5);
const snailed_matrix = new SnailedMatrix(answer);
snailed_matrix.start();

answer.forEach((row) => {
  console.log(JSON.stringify(row));
});
/*
(i) n = 4

[0,0] -> [1,0] -> [2,0] -> [3,0] -> [3,1] -> [3,2] -> [3,3] ->[2,2] -> [1,1] -> []
[0,0] -> ... -> [n-1,0] -> ... -> [n-1,n-1] -> [n-2,n-2] -> ... -> [2,2] ->
[1,1] -> ... -> [n-2,1] -> ... -> [n-2,n-2] -> [n-3,n-3] -> ... -> [3,3]
[4,4] -> ...


총 개수가 n(n+1)/2




0 1 2 3 4 5 6 4 2



*/
