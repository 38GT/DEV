import express from "express";
import dotenv from "dotenv";
import { pollingDART, getList } from "./dartApi.js";
import { proxy, updateNewList } from "./list.js";

dotenv.config();
const oneMinute = 60000;
const app = express();

const response = await pollingDART(0.1 * oneMinute);

const newList = updateNewList(response);

if (Number(proxy.currentList.length) !== Number(response.data.total_count)) {
  proxy.currentList = await getList(response);
  console.log(proxy.currentList.length);
}

// pollingAPI ->    getList    ->   get_new_list function -> classify function -> new_list에 있는 것들을 분리해주는 로직
// (response) -> (currentList) ->   (new_lists)   -> ... ->  tele_reports = ['tel_report1','tel_report2',...]

//텔레봇 켜기
// dda_dda_bot_start();

app.listen(3000, () => console.log("\x1b[31m", "DART알리미 test_server_start"));
