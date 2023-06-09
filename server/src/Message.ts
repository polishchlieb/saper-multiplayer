import { Difference } from './Board';

export enum MessageType {
  time = 'time',
  flag = 'flag',
  reveal = 'reveal',
  createGame = 'create-game',
  joinGame = 'join-game',
  nickname = 'nickname',
  start = 'start',
  error = 'error',
  end = 'end',
  diff = 'diff',
  waitingRoom = 'waiting-room',
  join = 'join',
  disconnect = 'disconnect',
  textMessage = 'text-message',
  options = 'options'
}

export enum WinReason {
  opponentLost = 'opponent-lost',
  playerWon = 'player-won',
  coopFinished = 'coop-finished',
  coopLost = 'coop-lost'
}

export default interface Message {
  type: MessageType;

  index?: number;
  player?: string;
  playerNames?: string[];
  value?: string | Difference;
  code?: string;
  nickname?: string;
  time?: number;
  reason?: WinReason;
  content?: string;
  author?: string;
  gamemode?: string;
}