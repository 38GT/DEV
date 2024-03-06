import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import { ReportPublisher } from "./publishingService.js";

dotenv.config({ path: "../../.env" });
const API_KEY = process.env.API_KEY;

const reportNames = [];

export default class TestReport extends ReportPublisher {
  constructor() {}

  static isPublisherable(data) {
    return true;
  }

  static async publish(data) {
    reportNames.push(data.report_nm);
    // TestReport.saveReportNamesToFile();
  }

  static saveReportNamesToFile() {
    // Set 객체를 사용하여 중복 제거
    const uniqueReportNames = [...new Set(reportNames)];

    // JSON 형식으로 파일에 저장
    fs.writeFile(
      "uniqueReportNames.json",
      JSON.stringify(uniqueReportNames, null, 2),
      (err) => {
        if (err) {
          console.error("파일 저장 중 오류 발생:", err);
        } else {
          console.log("파일이 성공적으로 저장되었습니다.");
        }
      }
    );
  }
}
