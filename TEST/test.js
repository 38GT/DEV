console.log("__TEST START__");

/*
값 넣기 성능 비교 실험
결과: 
  Array: about 10 ** 2 ms
  Set: 10 ** 3 ms
  Map: 1.3 * 10 ** 3 ms
*/

// let config = 10 ** 7; // 이 값을 변경하여 다른 데이터 크기를 실험해 볼 수 있습니다.

// function addToArray(array, count) {
//   for (let i = 0; i < count; i++) {
//     array.push(i);
//   }
// }

// function addToSet(set, count) {
//   for (let i = 0; i < count; i++) {
//     set.add(i);
//   }
// }

// function addToMap(map, count) {
//   for (let i = 0; i < count; i++) {
//     map.set(i, true);
//   }
// }

// const array = [];
// const set = new Set();
// const map = new Map();

// console.time("Array push 성능");
// addToArray(array, config);
// console.timeEnd("Array push 성능");

// console.time("Set add 성능");
// addToSet(set, config);
// console.timeEnd("Set add 성능");

// console.time("Map set 성능");
// addToMap(map, config);
// console.timeEnd("Map set 성능");

// const random = Math.random();

// const figNum = 100000;
// const new_Num = 10000;
// const num = Math.floor(random * figNum);

// const random_array_A = Array(figNum)
//   .fill()
//   .map(() => Math.floor(Math.random() * figNum));

// const new_array = Array(Math.floor(Math.random() * new_Num))
//   .fill()
//   .map(() => Math.floor(Math.random() * figNum));

// const random_array_B = [...random_array_A, ...new_array];

// function B_minus_A(A, B) {
//   return new Set(A).has(1);
// }

// function B_minus_A2(A, B) {
//   return !A.includes(1);
// }

// function B_minus_A3(A, B) {
//   const setA = new Set(A);
//   const setB = new Set(B);
//   return Array.from(setB).filter((number) => !setA.has(number));
// }

/*
값 넣기 성능 비교 실험
결과: 
  데이타의 크기에 따라서 실행 시간이 크게 변하지 않는다.
  Array: about 2 * 10 ** -2 ms
  Set: 8 * 10 ** - 3 ms
  Map: 7 * 10 ** - 3 ms
*/
const array = Array.from({ length: 10 ** 7 }, (_, index) => index);
const set = new Set(array);
const map = new Map(array.map((item) => [item, true]));
const config = 500;

function include(array, value) {
  array.includes(value);
}

function has(set, value) {
  set.has(value);
}

function get(map, key) {
  return map.get(key);
}

console.time("has 성능");
has(set, config);
console.timeEnd("has 성능");

console.time("include 성능");
include(array, config);
console.timeEnd("include 성능");

console.time("get 성능");
get(map, config);
console.timeEnd("get 성능");

// console.time("성능 테스트");
// B_minus_A(random_array_A, random_array_B);
// console.timeEnd("성능 테스트");

// console.time("성능 테스트2");
// B_minus_A2(random_array_A, random_array_B);
// console.timeEnd("성능 테스트2");

// console.time("성능 테스트3");
// B_minus_A3(random_array_A, random_array_B);
// console.timeEnd("성능 테스트3");

console.log("__TEST END__");

// setImmediate는 1초당 36990 번 코드 처리 가능

/*

(10,10): 0.064ms
(100,10): 0.2ms
(1000,10): 20ms

*/
