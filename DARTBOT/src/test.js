import fs from "fs/promises";

let counter;

const init = async () => {
  const data = await fs.readFile("counter.json", "utf8");
  counter = JSON.parse(data);
};

const work = (period) => {
  try {
    console.log(counter);
    counter++;
    throw new Error("error occur!");
  } catch (err) {
  } finally {
    fs.writeFile("counter.json", JSON.stringify(counter), (err) => {
      if (err) {
        console.error("파일 저장 중 오류 발생:", err);
      } else {
        console.log("파일이 성공적으로 저장되었습니다.");
      }
    });
  }
  setTimeout(() => work(period), period);
};

const main = async () => {
  await init();
  work(1000);
};

main();
// 큐를 활용한 비동기 데이터 처리 로직

// const inputQueue = new Queue();
// const outputQueue = new Queue();

// let count = 0;

// const enqueuePolling = (period, queue) => {
//   // const ranNum = Math.floor(Math.random * 10);
//   queue.enqueue(count);
//   count++;
//   setTimeout(() => enqueuePolling(period, queue), period);
// };

// const work = async (inputQueue, outputQueue) => {
//   let data;
//   while ((data = inputQueue.dequeue()) !== null) {
//     const processedData = await process(data);
//     outputQueue.enqueue(processedData);
//   }
//   await delay(0);
//   work(inputQueue, outputQueue);
// };

// const consoleLog = async (outputQueue) => {
//   let data;
//   while ((data = outputQueue.dequeue()) !== null) {
//     console.log(data);
//   }
//   await delay(0);
//   consoleLog(outputQueue);
// };
