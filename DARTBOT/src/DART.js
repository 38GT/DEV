import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const API_KEY = process.env.API_KEY;

export class DART {
  constructor() {}

  static #new_list = [];
  static #today_list = [];

  static get new_list() {
    return DART.#new_list;
  }

  static set new_list(new_list) {
    DART.#new_list = new_list;
  }

  static get today_list() {
    return DART.#today_list;
  }

  static set today_list(today_list) {
    DART.#today_list = today_list;
  }

  static async fetch_DART() {
    try {
      const response = await axios.get(
        `https://opendart.fss.or.kr/api/list.json?crtfc_key=${API_KEY}&page_count=10`
      );
      console.log("오늘 올라온 공시 개수: ", response.data.total_count);
      if (
        response.data.total_count !== DART.today_list.length &&
        response.data.total_count
      ) {
        const old_list = DART.today_list;
        DART.today_list = await DART.#get_today_list(response);
        DART.new_list = DART.today_list.filter(
          // 이 부분 map,set,obj 사용해보면서 성능 테스트 해보기
          (item) => !old_list.some((disc) => is_same_disclosure(disc, item))
        );
      }
    } catch (err) {
      console.error("API 받아오기 실패", err);
    }
  }

  static async #get_today_list(response) {
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
  }
}

function is_same_disclosure(disc1, disc2) {
  return (
    disc1.corp_code === disc1.corp_code &&
    disc1.report_nm === disc2.report_nm &&
    disc1.rcept_no === disc2.rcept_no
  );
}
