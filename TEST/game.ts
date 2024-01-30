// https://delivan.dev/react/programming-patterns-with-react-hooks-kr/
// 1. 옵저버 패턴
// 2. 프로바이더 패턴
// 아래에 완성되지 않은 코드: 옵저버 패턴 예시

export type Team = "Home" | "Away";
export type GoalListener = (teamThatScored: Team) => void;

class GameSubject {
  private listeners: GoalListener[] = [];

  public attach(listener: GoalListener) {
    this.listeners.push(listener);
  }
}
