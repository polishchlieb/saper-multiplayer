export default interface Field {
  x: number;
  y: number;
  hasBomb?: boolean;
  isVisible?: boolean;
  isFlagged?: boolean;
  nearBombs?: number;
}