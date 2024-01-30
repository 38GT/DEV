const { even, odd } = require("./var");
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) return odd;
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("Hello"));
