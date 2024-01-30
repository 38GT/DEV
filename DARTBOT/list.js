import fs from "fs";

export function updateNewList() {}

if (Number(proxy.currentList.length) !== Number(response.data.total_count)) {
  proxy.currentList = await getList(response);
  console.log(proxy.currentList.length);
}

export const data = {
  currentList: [],
};

const handler = {
  // 속성 쓰기 작업 가로채기
  set: function (obj, prop, value) {
    if (prop === "currentList" && Array.isArray(value)) {
      console.log(`currentList가 새로운 배열로 변경되었습니다.`);
      obj[prop] = value;
      return true;
    } else {
      console.log(`변경 시도: ${prop} = ${value}`);
      obj[prop] = value;
      return true;
    }
  },
};

export const proxy = new Proxy(data, handler);
