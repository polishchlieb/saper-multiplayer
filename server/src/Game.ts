interface GameProperties {
  width: number;
  height: number;
  bombCount: number;
}

export default abstract class Game {
  private startTimestamp: number = Date.now();

  public constructor(public properties: GameProperties) {}

  public get time() {
    return Date.now() - this.startTimestamp;
  }

  public abstract get finished(): boolean;
}