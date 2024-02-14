class REPORT {
  constructor() {}

  // 프록시 패턴 사용하기
  find_news(new_list) {
    const handler = {
      set: (obj, prop, value) => {
        if (prop === "DART.new_list" && Array.isArray(value)) {
          obj[prop] = value;
          console.log("새로 올라온 공시 : ", value.length, value);
          try {
            reports.get_tsstkAqDecsn_list(disclosure.added_list);
            get_tsstkDpDecsn_list(disclosure.added_list);
          } catch (err) {
            console.err("보고서를 위한 추가 API 요청 실패", err);
          }

          return true;
        }
      },

      get: (obj, prop) => {
        if (prop in obj) {
          return obj[prop];
        }
      },
    };

    const data = {
      new_list: new_list,
    };

    const disclosure_ = new Proxy(data, handler);
  }

  publish() {}
}

export async function get_tsstkAqDecsn_list(added_list) {
  const added_corp_code_list = added_list.map((corp) => corp["corp_code"]);
  let data = [];

  for (const corp_code of added_corp_code_list) {
    const response = await axios.get(
      `https://opendart.fss.or.kr/api/tsstkAqDecsn.json?crtfc_key=${API_KEY}&corp_code=${corp_code}&bgn_de=20240205&end_de=20240205`
    );
    if (response.data.status === "000") data.push(response.data.list);
  }

  console.log("자기 주식 취득 결정 data: ", data.length, data);
}

export async function get_tsstkDpDecsn_list(added_list) {
  const added_corp_code_list = added_list.map((corp) => corp["corp_code"]);
  let data = [];

  for (const corp_code of added_corp_code_list) {
    const response = await axios.get(
      `https://opendart.fss.or.kr/api/tsstkDpDecsn.json?crtfc_key=${API_KEY}&corp_code=${corp_code}&bgn_de=20240205&end_de=20240205`
    );
    if (response.data.status === "000") data.push(response.data.list);
  }

  console.log("자기 주식 처분 결정 data: ", data.length, data);
}

/*
각 리포트를 만드는 주체들이 새로 업데이트된 disclosure.added_list를 직접 훑는다.
그럴려면 어떻게 구조를 짜야할까?

< 필요한 함수 >

1. disclosure.added_list를 탐색하는 함수
2. 리포트 템플릿 만들어주는 함수
3. 
4. 


*/
// new_lists를 감시하고 분류를 진행할 주체가 필요함

// (1) 각 로우 리포트를 바탕으로 선별작업
// (2) 선별된 리포트 종류마다 필요한 추가 자료 수집(추가 API 수집 등) -> 이건 각 리포트 마다 달라지는 작업이므로 (?)인지 확인 후에 여기에 넣을지 각 리포트별로 넣을지 고민해보기

// 보고서 종류마다 클래스로 관리하자.
// 각 종류의 리포트 클래스는 개별적인 '문서 양식'과 '필요한 파라미터들'이 존재한다.

//각 리포트는 전달 받는 new_lists의 원소에 의해서 인스턴스가 만들어지고 안에 있는 메서드 들을 통해서 추가적인 정보 수집을 통해 하나의 텔레그램 리포트를 만들어낸다.
