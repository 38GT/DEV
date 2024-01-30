/*

아래에 클래스 상속 구현해보기 


*/

class Person {
  
  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }
  this._name = name;
  this._age = age;
  this._value = value;
}

class PersonCls extends Person {
  constructor(name: string, age: number) {
    super();
    this._name = name;
    this._age = age;
  }
  private _name: string;
  private _age: number;

  set name(newName: string) {
    this._name = newName;
  }

  get name(): string {
    return this._name;
  }

  set age(newAge: number) {
    this._age = newAge;
  }

  get age(): number {
    return this._age;
  }
}

const J = new PersonCls("J", 20);

console.log(Object.getOwnPropertyDescriptors(J));

// function PersonFnc(name: string, age: number) {
//   this._name = name;
//   this._age = age;
//   Object.defineProperties(this, {
//     name: {
//       get: function () {
//         return this._name;
//       },
//       set: function (newName) {
//         this._name = newName;
//       },
//     },
//     age: {
//       get: function () {
//         return this._age;
//       },
//       set: function (newName) {
//         this._age = newName;
//       },
//     },
//   });
// }
