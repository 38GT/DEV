export type Team = "Home" | "Away";
export type GoalListener = (teamThatScored: Team) => void;

class GameSubject {
  private listeners: GoalListener[] = [];

  public attach(listener: GoalListener) {
    this.listeners.push(listener);
  }
}
