import express from "express";
import dotenv from "dotenv";
import { DART } from "./DART.js";
// import { REPORT } from "./REPORT.js";
// import { SUBSCRIBE } from "./SUBSCRIBE.js";
// import { CHAT_BOT } from "./CHAT_BOT.js";

dotenv.config();

const oneMinute = 60000;
const app = express();

// polling_API ->  update_disclosure_list   -> report man ->   tele_bot
// (response) ->   (added_list)   ->   ...  ->   (report)     ->   ()

//텔레봇 켜기
// dda_dda_bot_start();

//뒤에 폴링 기간설정 로직 미추가 상태

const queue = new Queue();

// 다트와 폴링을 분리시켜야 하는가? 모르겠다. 다른 곳에서 해당 주기를 또 사용하지 않을 것 같다.
// -> 폴링에 의존적인게 맞다.
// 만약 사용한다면 나중에 합치면 되려나,
// CHAT_BOT.start_work();

polling_and_enqueue(queue);

function polling_and_enqueue(queue) {
  try {
    DART.fetch_DART();
    DART.new_list.forEach((data) => queue.enqueue(data));
  } catch (err) {
    console.err("DART 받아오기 실패", err); // 실패한 경우 DART.new_list 안에 에러메세지 같은게 들어 있으면 어떻게 하지? 이것도 확인해보자.
  } finally {
    setTimeout(() => polling_and_enqueue(queue), 0);
  }
}
REPORT.find_news(DART.new_list) // 프라미스 객체를 리턴하는 함수여야 한다.
  .then((news) => REPORT.publish(news))
  .then((reports) => {
    SUBSCRIBE.update();
    CHAT_BOT.deliver(reports, SUBSCRIBE.users);
  });

REPORT.find_news(DART.new_list);

app.listen(3000, () => console.log("\x1b[31m", "DART알리미 test_server_start"));
