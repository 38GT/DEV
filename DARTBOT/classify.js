const new_lists = ["raw_report1", "raw_report2"];

// new_lists를 감시하고 분류를 진행할 주체가 필요함

const report = {
  subscribers: [],
  format: "",
};

new_lists.forEach((raw_report) => {
  // (1) 각 로우 리포트를 바탕으로 선별작업
  // (2) 선별된 리포트 종류마다 필요한 추가 자료 수집(추가 API 수집 등) -> 이건 각 리포트 마다 달라지는 작업이므로 (?)인지 확인 후에 여기에 넣을지 각 리포트별로 넣을지 고민해보기
});
// 보고서 종류마다 클래스로 관리하자.
// 각 종류의 리포트 클래스는 개별적인 '문서 양식'과 '필요한 파라미터들'이 존재한다.

//각 리포트는 전달 받는 new_lists의 원소에 의해서 인스턴스가 만들어지고 안에 있는 메서드 들을 통해서 추가적인 정보 수집을 통해 하나의 텔레그램 리포트를 만들어낸다.

class Report {
  constructor(report_nm) {
    this.report_nm = report_nm;
  }
}
