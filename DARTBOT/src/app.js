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

DART.start_today_polling(0.1 * oneMinute, "아침 9시부터", "저녁 10시까지");

// CHAT_BOT.start_work();

REPORT.find_news(DART.new_list) // 프라미스 객체를 리턴하는 함수여야 한다.
  .then((news) => REPORT.publish(news))
  .then((reports) => {
    SUBSCRIBE.update();
    CHAT_BOT.deliver(reports, SUBSCRIBE.users);
  });

REPORT.find_news(DART.new_list);

app.listen(3000, () => console.log("\x1b[31m", "DART알리미 test_server_start"));
