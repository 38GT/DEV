var a = "one";

const obj = {
  a: 1,
  b: "B",
  c() {
    showThis();
  },
  showThis,
};

function showThis() {
  console.log(this.a);
}

obj.c();
showThis();
obj.showThis();
