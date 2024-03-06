// 큐를 활용한 비동기 데이터 처리 로직

const inputQueue = new Queue();
const outputQueue = new Queue();

let count = 0;

const enqueuePolling = (period, queue) => {
  // const ranNum = Math.floor(Math.random * 10);
  queue.enqueue(count);
  count++;
  setTimeout(() => enqueuePolling(period, queue), period);
};

const work = async (inputQueue, outputQueue) => {
  let data;
  while ((data = inputQueue.dequeue()) !== null) {
    const processedData = await process(data);
    outputQueue.enqueue(processedData);
  }
  await delay(0);
  work(inputQueue, outputQueue);
};

const consoleLog = async (outputQueue) => {
  let data;
  while ((data = outputQueue.dequeue()) !== null) {
    console.log(data);
  }
  await delay(0);
  consoleLog(outputQueue);
};
