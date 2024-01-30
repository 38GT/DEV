// 1단계: 기본 객체
function Level1() {
  this.level1Property = "Level 1";
}
Level1.prototype.level1Method = function () {
  console.log("Level 1 Method");
};

// 2단계: Level1을 상속
function Level2() {
  Level1.call(this);
  this.level2Property = "Level 2";
}
Level2.prototype = Object.create(Level1.prototype);
Level2.prototype.constructor = Level2;
Level2.prototype.level2Method = function () {
  console.log("Level 2 Method");
};

// 3단계: Level2를 상속
function Level3() {
  Level2.call(this);
  this.level3Property = "Level 3";
}
Level3.prototype = Object.create(Level2.prototype);
Level3.prototype.constructor = Level3;
Level3.prototype.level3Method = function () {
  console.log("Level 3 Method");
};

// 4단계: Level3을 상속
function Level4() {
  Level3.call(this);
  this.level4Property = "Level 4";
}
Level4.prototype = Object.create(Level3.prototype);
Level4.prototype.constructor = Level4;
Level4.prototype.level4Method = function () {
  console.log("Level 4 Method");
};

// 객체 생성
const level4Instance = new Level4();

console.log(
  level4Instance.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
);

// 'searchPrototypeChain' 함수를 사용하여 프로토타입 체인 검색
const prototypeChain = searchPrototypeChain(level4Instance);

const grandFather = {
  grandfatherHello() {
    console.log("I'm your grandFather");
  },
};

const father = {
  __proto__: grandFather,
  fatherHello() {
    console.log("I'm your father");
  },
};
const son = {
  __proto__: father,
};

const Car = (function () {
  function Car() {}
  Car.prototype.move = function () {
    console.log("move!");
  };
  return Car;
})();

const ModelS = (function () {
  function ModelS() {}
  ModelS.prototype = Object.create(Car.prototype);
  ModelS.prototype.constructor = ModelS;
  ModelS.prototype.autoMove = function () {
    console.log("auto Move!");
  };
  return ModelS;
})();

const myCar = new ModelS();

myCar.name = "Tiger";

console.log(myCar);

// 프로토타입체인 서칭하는 함수
function searchPrototypeChain(object, properties = []) {
  properties.push({ object, props: Object.getOwnPropertyNames(object) });
  const proto = Object.getPrototypeOf(object);
  if (proto == null) return properties;
  return searchPrototypeChain(proto, properties);
}
// function searchPrototypeChain(object, properties = []) {
//   properties.push([...Object.getOwnPropertyNames(object), object]);
//   const proto = Object.getPrototypeOf(object);
//   if (proto == null) return properties;
//   return searchPrototypeChain(proto, properties);
// }
// //
// console.log(searchPrototypeChain(myCar));
