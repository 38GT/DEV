export class Cell {
  cellClock: number = 300;
  generation: number;
  name: string;
  energy: number;
  status: string;
  age: number = 0;

  lifeCycle: string[] = ["grow", "complete", "duplicate", "die"];

  constructor(name: string, energy: number, generation?: number) {
    this.generation = generation = 0;
    this.name = name;
    this.energy = energy;
    this.status = this.lifeCycle[0];
    setInterval(() => {
      console.log(
        "이름: " +
          this.name +
          " 에너지: " +
          this.energy +
          " 나이: " +
          this.age +
          " 단계: " +
          this.status
      );
      this.checkPoint(this.status, this.age, this.energy);
      this.aging(this.status);
    }, this.cellClock);
  }

  aging(status: string): void {
    if (status == this.lifeCycle[0]) {
      this.age += this.cellClock;
      this.energy -= 2;
    }
    if (status == this.lifeCycle[1]) {
      this.age += this.cellClock;
      this.energy -= 1;
    }
    if (status == this.lifeCycle[2]) {
      this.age += this.cellClock;
      this.energy -= 4;
    }
    if (status == this.lifeCycle[2]) {
      //세포가 죽은 상태
    }
  }

  checkPoint(status: string, age: number, energy: number) {
    if (age <= 10 * this.cellClock) this.status = this.lifeCycle[0];
    if (
      status == this.lifeCycle[0] &&
      age > 10 * this.cellClock &&
      age <= 15 * this.cellClock
    ) {
      this.status = this.lifeCycle[1];
    }
    if (
      status == this.lifeCycle[1] &&
      age > 15 * this.cellClock &&
      age < 20 * this.cellClock
    )
      this.status = this.lifeCycle[2];
    if (status == this.lifeCycle[2] && age == 20 * this.cellClock) {
      const nextCellA = new Cell(
        `cellA_gen${this.generation}`,
        this.energy / 2,
        this.generation + 1
      );
      const nextCellB = new Cell(
        `cellB_gen${this.generation}`,
        this.energy / 2,
        this.generation + 1
      );
    }
    if (energy <= 0) {
      this.status = this.lifeCycle[3];
    }
  }

  // if(this.energy>= 10 && this.age >=15000) this.status = this.lifeCycle[1]
  // if(this.status == this.lifeCycle[1] && this.energy >= 10) this.status = this.lifeCycle[2]
  // if(this.status == this.lifeCycle[2]){
  //     this.generation += 1

  // }
}
