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
  async combine(combineCall: string, robots: Promise<string>[]) {
    console.log(combineCall);
    if (this.type !== "main")
      throw new Error("메인 로봇만이 합체 콜링이 가능합니다.");
    await Promise.all(robots).then(() => {
      console.log("합체 성공!");
    });
  }
}

const robotMain = new Robot("mainRobot", "main");
const robotA = new Robot("robotA");
const robotB = new Robot("robotB");
const robotC = new Robot("robotC");

robotMain.combine("가라 그랜다간 합체!", [
  robotMain.transformation(),
  robotA.transformation(),
  robotB.transformation(),
  robotC.transformation(),
]);

//위 코드 실행시 배열 내부에 있는 트랜스포메이션 매소드들이 컴바인 내부 코드보다 먼저 실행된다.
