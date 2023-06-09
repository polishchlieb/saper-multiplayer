import Field from './Field';

export type Difference = Field[];

export interface BoardProperties {
  width: number;
  height: number;
  bombCount: number;
}

export default class Board {
  public fields: Field[];
  private startTimestamp = Date.now();

  private revealedCount = 0;
  public get isFinished() {
    const totalEmptyFields = this.size - this.bombCount;
    return this.revealedCount === totalEmptyFields;
  }

  public lost: boolean = false;

  public get ended(): boolean {
    return this.lost || this.isFinished;
  }

  private get width() { return this.properties.width; }
  private get height() { return this.properties.height; }
  private get bombCount() { return this.properties.bombCount; }
  private get size() { return this.width * this.height; }
  public get time() {
    return Date.now() - this.startTimestamp;
  }

  public constructor(
    private properties: BoardProperties
  ) {}

  public getFields(): Field[] {
    if (!this.fields)
      throw new Error(
        'Board was not generated before using getFields'
      );
    return this.fields;
  }

  public getField(x: number, y: number): Field {
    return this.fields[y * this.width + x];
  }

  public generate(): void {
    this.fields = [];

    // generate empty fields
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        this.fields.push({ x, y });
      }
    }

    // generate bombs
    let currentBombCount = 0;
    while (this.bombCount > currentBombCount) {
      const randomField = this.fields[
        Math.floor(Math.random() * this.fields.length)
      ];

      if (!randomField.hasBomb) {
        randomField.hasBomb = true;
        ++currentBombCount;
      }
    }
  }

  public toggleFlag(index: number): Difference {
    const field = this.fields[index];
    if (field.isVisible)
      return [];

    field.isFlagged = !field.isFlagged;
    return [{
      x: field.x,
      y: field.y,
      isFlagged: field.isFlagged
    }];
  }

  public reveal(field: Field): Difference {
    const { x, y } = field;
    const coords: [x: number, y: number] = [x, y];

    if (!field.isVisible) {
      field.isVisible = true;
      ++this.revealedCount;
    }
    field.isFlagged = false;

    if (field.hasBomb) {
      this.lost = true;
      return [field];
    }

    const nearBombs = this.calculateNearBombs(coords);
    field.nearBombs = nearBombs;
    if (nearBombs !== 0)
      return [field];

    const toReveal = this.getNearFields(coords)
      .filter(v => !v.hasBomb && !v.isVisible);

    let difference = [field]; // TODO: change to Set
    for (const neighbour of toReveal)
      difference = [...difference, ...this.reveal(neighbour)];
    return difference;
  }

  private isCorrectPosition([x, y]: [x: number, y: number]): boolean {
    return x >= 0 && x <= this.width - 1 && y >= 0 && y <= this.height - 1;
  }

  private getNearFields([x, y]: [x: number, y: number]): Field[] {
    return [
      [x - 1, y + 1], [x, y - 1], [x + 1, y + 1],
      [x - 1, y], [x + 1, y],
      [x - 1, y - 1], [x, y + 1], [x + 1, y - 1]
    ]
      .filter(this.isCorrectPosition.bind(this))
      .map(([x, y]) => this.fields[y * this.width + x]);
  }

  private calculateNearBombs(pos: [x: number, y: number]): number {
    return this.getNearFields(pos)
      .reduce((acc, { hasBomb }) => hasBomb ? acc + 1 : acc, 0);
  }
}