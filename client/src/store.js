/**
 * @type {{
 *  domRoot: HTMLElement;
 *  socket: WebSocket;
 *  interval: number;
 *  audio: HTMLAudioElement;
 *  players: string[];
 *  nickname: string;
 *  boards: {
 *   width: number;
 *   height: number;
 *   fields: {
 *    x: number;
 *    y: number;
 *    hasBomb?: boolean;
 *    isRevealed?: boolean;
 *   }[];
 *   finished: boolean;
 *  }[];
 *  code: string;
 * }}
 */
const globalData = {
  nickname: ''
};

export default globalData;