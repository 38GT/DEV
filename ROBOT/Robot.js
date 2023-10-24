"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Robot {
    constructor(name, type = "part") {
        this.name = name;
        this.state = "combat mode";
        this.type = type;
    }
    transformation() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = "combiner mode";
            console.log(`${this.name}, 합체를 위한 트랜스폼!`);
            return `${this.name}, 합체를 위한 트랜스폼!`;
        });
    }
    combine(combineCall, robots) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(combineCall);
            if (this.type !== "main")
                throw new Error("메인 로봇만이 합체 콜링이 가능합니다.");
            for (let robot of robots) {
                yield robot.transformation();
            }
            yield Promise.all(robots).then(() => {
                console.log("합체 성공!");
            });
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
