import axios from "axios";
import dotenv from "dotenv";
import { ReportPublisher } from "../services/publishingService.js";
import today from "../utils/today.js";

dotenv.config({ path: "../../.env" });
const API_KEY = process.env.API_KEY;

//지분공시
export default class ShareChange extends ReportPublisher {
  static reportNames = [
    "의결권대리행사권유참고서류",
    "임원ㆍ주요주주특정증권등소유상황보고서",
    "주식등의대량보유상황보고서(약식)",
    "주식등의대량보유상황보고서(일반)",
    "[기재정정]의결권대리행사권유참고서류",
    "[첨부정정]의결권대리행사권유참고서류",
    "[기재정정]주식등의대량보유상황보고서(일반)",
    "[기재정정]임원ㆍ주요주주특정증권등소유상황보고서",
    "의결권대리행사권유에관한의견표명서",
    "[기재정정]주식등의대량보유상황보고서(약식)",
    "[기재정정]공개매수설명서",
    "[기재정정]공개매수신고서",
    "공개매수설명서",
    "공개매수신고서",
    "[기재정정]의결권대리행사권유에관한의견표명서",
    "공개매수결과보고서",
    "[첨부추가]의결권대리행사권유참고서류",
  ];

  static reportFormat() {}

  //[],(), 공백 처리하는 로직 넣기
  static isPublisherable(data) {
    return ShareChange.reportNames.some(
      (report_nm) => report_nm === data.report_nm
    );
    // return true;
  }
  static async publish(data) {
    //대량보유 상황보고
    try {
      const majorstockResponse = await axios.get(
        `https://opendart.fss.or.kr/api/majorstock.json?crtfc_key=${API_KEY}&corp_code=${data.corp_code}`
      );

      const majorstockList = majorstockResponse.data.list;

      if (
        majorstockList?.length &&
        majorstockList[majorstockList.length - 1].rcept_dt === today
      ) {
        const reportObject = majorstockList[majorstockList.length - 1];
        const upDownEmoji =
          reportObject.stkrt_irds > 0
            ? "🔺"
            : reportObject.stkrt_irds < 0
            ? "🔻"
            : "";
        const report = `<b>대량보유 상황보고</b>\n<b>기업명:</b> ${reportObject.corp_name}\n<b>보고구분:</b> ${reportObject.report_tp}\n<b>대표보고자:</b> ${reportObject.repror}\n<b>보유비율 증감:</b> ${reportObject.stkrt_irds}%${upDownEmoji}\n<b>보고사유:</b> ${reportObject.report_resn}\n<a href="https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${reportObject.rcept_no}">공시링크</a>`;

        return report;
      } else return null;

      //임원ㆍ주요주주 소유보고
      // const elestock = await axios.get(
      //   `https://opendart.fss.or.kr/api/elestock.json?crtfc_key=${API_KEY}&corp_code=${data.corp_code}`
      // );
    } catch (err) {
      console.log(err);
    }
  }
}
