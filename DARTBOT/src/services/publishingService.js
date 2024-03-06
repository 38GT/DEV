import fs from "fs/promises";
import { fileURLToPath } from "url";
import delay from "../utils/delay.js";

let reportPublisherModules = [];

const uploadReportPublisherModules = async () => {
  try {
    const reportsPath = new URL("../reports/", import.meta.url);
    const files = await fs.readdir(reportsPath);
    const reportModules = files.map(async (file) => {
      const filePath = fileURLToPath(new URL(`./${file}`, reportsPath));
      return import(filePath);
    });
    reportPublisherModules = await Promise.all(reportModules);
    reportPublisherModules = reportPublisherModules.map(
      (reportPublishingModule) => reportPublishingModule.default
    );
  } catch (err) {
    console.log("report 파일 업로드 에러", err);
  }
};

export const reportBootstrap = async () => {
  await uploadReportPublisherModules();
};

export const reportPublishing = async (inputQueue, outputQueue) => {
  let dartData;
  while ((dartData = inputQueue.dequeue()) !== null) {
    // console.log(dartData);
    const promisedReports = reportPublisherModules.map((module) => {
      if (module.isPublisherable(dartData)) {
        return module.publish(dartData);
      }
      return Promise.resolve(null);
    });
    const resolvedReports = await Promise.all(promisedReports);
    // console.log(resolvedReports);
    resolvedReports.forEach((report) => {
      if (report !== null) outputQueue.enqueue(report);
    });
  }
  await delay(0);
  reportPublishing(inputQueue, outputQueue);
};

reportBootstrap();

export class ReportPublisher {
  static isPublisherable() {}
  static async publish() {}
}
