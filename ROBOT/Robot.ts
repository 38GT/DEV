class Robot {
  state: string;
  name: string;
  type: string;
  constructor(name: string, type: string = "part") {
    this.name = name;
    this.state = "combat mode";
    this.type = type;
  }
  async transformation() {
    this.state = "combiner mode";
    console.log(`${this.name}, 합체를 위한 트랜스폼!`);
    return `${this.name}, 합체를 위한 트랜스폼!`;
  }
  async combine(combineCall: string, robots: Robot[]) {
    console.log(combineCall);
    if (this.type !== "main")
      throw new Error("메인 로봇만이 합체 콜링이 가능합니다.");
    for (let robot of robots) {
      await robot.transformation();
    }
    await Promise.all(robots).then(() => {
      console.log("합체 성공!");
      //합체한 순서대로 로봇이름 새로 지어서 여기다가 써주기 그리고 새로 합체한 로봇 새로운 로봇인스턴스로 만들어보기
    });
  }
}

const robotMain = new Robot("mainRobot", "main");
const robotA = new Robot("robotA");
const robotB = new Robot("robotB");
const robotC = new Robot("robotC");

robotMain.combine("가라 그랜다간 합체!", [robotMain, robotA, robotB, robotC]);

/* 문제점
1. 합체 전 메인 로봇의 트랜스폼이 선결 조건이 되지 않는다.
2. 파트타입 로봇이 합체 콜링시 다른 로봇들의 트랜스폼이 시작되면 안된다. -> 순서를 아에 다르게 해야함. 
  (1) 메인로봇의 합체 콜링 성공시 전체 로봇들의 트랜스포메이션이 발동되야 한다.    
  (2) 순서: 메인로봇 합체콜링 성공 시 -> 파트로봇 + 메인로봇 트랜스포메이션 시작 -> 트랜스포메이션 4개 전부 완료 시 -> 합체 실시
      순서: 메인로봇 합체콜링 실패 시 -> 에러처리         
      순서:                                                      -> 트랜스포메이션 4개 중 1개 이상 실패시 -> 나머지 로봇들 다시 리버스트랜스포메이션
*/
