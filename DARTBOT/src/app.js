import express from "express";
import Queue from "./utils/Queue.js";
import { pollingDARTdata } from "./services/dartApiService.js";
import {
  reportPublishing,
  reportBootstrap,
} from "./services/publishingService.js";
import deliverReport from "./services/deliveryService.js";
const app = express();

//중복이 발생한다. 이거 어떻게 찾아야 하나
//큐 채워져있는 실시간 상황 보여주는 간단한 로그 시스템 만들면 좋을 듯
// 리포트 말고도 처음에 엄청나게 쏟아지는 값들을 재정비해주는 초기화도 필요해보임
// 초기화: node 인스턴스 재부팅 후 쏟아지는 거 정리하는 기능
// 초기화: 각 보고서별 목록 초기화

/*

(1) 보고서 정확하게 만들기 (O)
(4) 왜 200이 몰아서 나오는가? <=> fetch_data 메서드는 왜 period를 무시하는가 (O)
(2) 중복어디서 발생하는지 알아내기 => 찾아냄 => 
  원인: 필터로 걸러낸 공시들이 해당 보고서에서 사용되는 것이 아닌 경우가 생김
  해결법: 공시유형이 아닌 요청 URL별로 보고서 나누기
  필요한것: 자동화 기법 -> URL마다 가능한 보고서 제목 리스트 뽑아주는 자동화 코드 짜기
  URL 넣으면 리스트 가져오는 코드

  const rpnmMaker = (URL)=> {
    return rpnmList;
  }

*/

const main = async () => {
  const dartQueue = new Queue();
  const reportQueue = new Queue();
  await reportBootstrap();
  pollingDARTdata(dartQueue, 600);
  reportPublishing(dartQueue, reportQueue);
  deliverReport(reportQueue);
};

main();

app.listen(3000, () => console.log("\x1b[31m", "DART알리미 test_server_start"));
