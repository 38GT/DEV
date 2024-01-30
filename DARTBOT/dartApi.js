import axios from "axios";
import dotenv from "dotenv";
import jszip from "jszip";
import xml2js from "xml2js";
import { data, proxy } from "./list.js";

dotenv.config();
const API_KEY = process.env.API_KEY;

export async function pollingDART(period) {
  try {
    return await axios.get(
      `https://opendart.fss.or.kr/api/list.json?crtfc_key=${API_KEY}&page_count=10`
    );
  } catch (err) {
    console.error("API 받아오기 실패", err);
  } finally {
    setTimeout(() => pollingDART(period), period);
  }
}

//한번에 요청하는 페이지 수 늘려서 API 호출 수 줄이기
export const getList = async (response) => {
  const pageRequests = [];
  const pageNum = response.data.total_page;
  for (let i = 1; i <= pageNum; i++) {
    const pageRequest = axios
      .get(
        `https://opendart.fss.or.kr/api/list.json?crtfc_key=${API_KEY}&page_count=10&page_no=${i}`
      )
      .then((pageResponse) => pageResponse.data.list);
    pageRequests.push(pageRequest);
  }

  const allPagesList = await Promise.all(pageRequests);
  const todayList = [].concat(...allPagesList);
  return [...new Set(todayList)];
};

//ASAW 버전으로 바꿔야함, 언제 필요할지도 알아내야함
const updateCorpCode = () =>
  axios
    .get(`https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${API_KEY}`, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      if (!isDataLoaded(response)) {
        throw Error("파일 메모리 업로드 실패");
      }
      const zip = new jszip();
      return zip.loadAsync(response.data);
    })
    .then((zipFile) => {
      const fileName = Object.keys(zipFile.files)[0];
      return zipFile.file(`${fileName}`).async("string");
    })
    .then((resolvedZipFile) => {
      return new Promise((resolve, reject) => {
        xml2js.parseString(resolvedZipFile, (err, result) => {
          if (err) {
            console.error("XML 파싱 오류: ", err);
          } else {
            const list = result.result.list;
            resolve(list);
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

const today = (() => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const YYYYMMDD = `${year}${month}${day}`;
  return YYYYMMDD;
})();

function isDataLoaded(response) {
  return (
    Number(response.headers["content-length"]) ===
    Number(response.data.byteLength)
  );
}
