import express from "express";
import Queue from "./utils/Queue.js";
import { pollingDARTdata } from "./services/dartApiService.js";
import {
  reportPublishing,
  reportBootstrap,
} from "./services/publishingService.js";
import deliverReport from "./services/deliveryService.js";
import delay from "./utils/delay.js";
const app = express();
const consoleLog = async (reportQueue) => {
  let report;
  while ((report = reportQueue.dequeue()) !== null) {
    console.log(reportQueue.dequeue());
  }
  await delay(0);
  consoleLog(reportQueue);
};

//중복이 발생한다. 이거 어떻게 찾아야 하나
//큐 채워져있는 실시간 상황 보여주는 간단한 로그 시스템 만들면 좋을 듯
// 리포트 말고도 처음에 엄청나게 쏟아지는 값들을 재정비해주는 초기화도 필요해보임
// 초기화: node 인스턴스 재부팅 후 쏟아지는 거 정리하는 기능
// 초기화: 각 보고서별 목록 초기화

/*
(1) 보고서 정확하게 만들기
(2) 중복어디서 발생하는지 알아내기
(3) 임원 변경 보고서 만들기
*/

const main = async () => {
  const dartQueue = new Queue();
  const reportQueue = new Queue();
  await reportBootstrap();
  pollingDARTdata(dartQueue, 60000);
  reportPublishing(dartQueue, reportQueue);
  deliverReport(reportQueue);
};

main();

app.listen(3000, () => console.log("\x1b[31m", "DART알리미 test_server_start"));

{
  /* <b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote> */
}
