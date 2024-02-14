//Queue
class Queue {
  array = [];

  inqueue(item) {
    this.array.push(item);
    return item;
  }

  dequeue_sp() {
    const item = this.array[0];
    this.array.splice(0, 1);
    return item;
  }

  dequeue_sh() {
    const item = this.array[0];
    this.array.shift();
    return item;
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue3 {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head === null) {
      this.head = node;
    } else this.tail.next = node;

    this.tail = node;
    this.size += 1;
  }

  length() {
    return this.size;
  }

  popLeft() {
    const popedItem = this.head.item;
    this.head = this.head.next;
    this.size -= 1;
    if (this.size === 0) {
      this.tail = null;
    }
    return popedItem;
  }

  print() {
    let current = this.head;
    console.log("start print");
    while (current) {
      console.log(current.item);
      current = current.next;
    }
  }
}

const queue1 = new Queue();
const queue2 = new Queue();
const queue3 = new Queue3();

const N = 10 ** 5;

for (let i = 0; i < N; i++) {
  queue1.inqueue(i);
  queue2.inqueue(i);
  queue3.push(i);
}

console.time("inqueue");
for (let i = 0; i < N; i++) {
  queue1.inqueue(i);
}
console.timeEnd("inqueue");

console.time("push");
for (let i = 0; i < N; i++) {
  queue3.push(i);
}
console.timeEnd("push");

for (let i = 0; i < N; i++) {}

console.time("splice");
for (let i = 0; i < N; i++) {
  queue1.dequeue_sp(i);
}
console.timeEnd("splice");

console.time("shift");
for (let i = 0; i < N; i++) {
  queue2.dequeue_sh(i);
}
console.timeEnd("shift");

console.log(queue3.length());

console.time("pop_left");
for (let i = 0; i < N; i++) {
  queue3.popLeft(i);
}
console.timeEnd("pop_left");
