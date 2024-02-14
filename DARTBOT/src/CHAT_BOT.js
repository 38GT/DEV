import TelegramBot from "node-telegram-bot-api";

const TELE_TOKEN = process.env.TELE_TOKEN;
const bot = new TelegramBot(TELE_TOKEN, { polling: true });

//옵저버 패턴

/*



*/

export function dda_dda_bot_start() {
  // '/echo' 라는 명령어가 오면, 로직 수행 후 => 따라 말한다.
  bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' : 텔레그램으로 부터 수신한 메세지
    // 'match' : 정규식을 실행한 결과

    const chatId = msg.chat.id;
    const resp = "따라하기 : " + match[1];

    bot.sendMessage(chatId, resp);
  });

  // .on('message')을 통해 bot이 어떤 메세지든 수신하도록 해줌
  bot.on("message", async (msg) => {
    const todayList = await updateList();
    const corpList = todayList.map((corp) => corp.corp_name);
    const chatId = msg.chat.id;
    console.log(chatId);
    bot.sendMessage(chatId, corpList.join("\n"));
  });

  bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  });
}
