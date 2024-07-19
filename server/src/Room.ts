import Client from './Client';
import ClientHandler from './ClientHandler';
import Board, { BoardProperties } from './Board';
import Message, { MessageType } from './Message';
import GameMode from './GameMode';

export default class Room extends ClientHandler {
  private gameMode: GameMode = GameMode.competition;

  public constructor(public code: string) {
    super();
  }

  public join(client: Client) {
    if (this.clients.some(c => c.nickname === client.nickname))
      return client.close();

    this.broadcast({
      type: MessageType.join,
      nickname: client.nickname
    });

    this.clients.push(client);
    client.handlers.push(this);

    client.send({
      type: MessageType.waitingRoom,
      playerNames: this.clients.map(c => c.nickname),
      code: this.code
    });
  }

  public handleDisconnection(client: Client) {
    this.broadcast({
      type: MessageType.disconnect,
      player: client.nickname
    });
  }

  public boards: {
    [k: string]: Board
  };
  public get isDuringGame(): boolean {
    return this.boards !== undefined;
  }

  public broadcast(message: Message) {
    const data = JSON.stringify(message);
    for (const client of this.clients)
      client.sendRaw(data);
  }

  public start() {
    if (this.gameMode === GameMode.competition)
      this.startCompetition();
    if (this.gameMode === GameMode.coop)
      this.startCoop();
  }

  private startCompetition() {
    if (this.clients.length > 2)
      return this.broadcast({
        type: MessageType.error,
        value: 'za dużo graczuw!!'
      });
    if (this.clients.length < 2)
      return this.broadcast({
        type: MessageType.error,
        value: 'za mało graczuw!!'
      });

    const properties: BoardProperties = {
      width: 10,
      height: 10,
      bombCount: 12
    };

    this.boards = {};
    for (const client of this.clients)
      this.boards[client.nickname] = new Board(properties);
  
    for (const board of Object.values(this.boards))
      board.generate();

    this.broadcast({
      type: MessageType.start,
      playerNames: this.clients.map(c => c.nickname),
      gamemode: GameMode.competition
    });
  }

  private startCoop() {
    const properties: BoardProperties = {
      width: 10,
      height: 10,
      bombCount: 12
    };

    this.boards = {
      0: new Board(properties)
    };
    this.boards[0].generate();

    this.broadcast({
      type: MessageType.start,
      gamemode: GameMode.coop
    });
  }

  public enterWaitingRoom() {
    delete this.boards;

    this.broadcast({
      type: MessageType.waitingRoom,
      playerNames: this.clients.map(c => c.nickname),
      code: this.code
    });
  }

  public setGameMode(gamemode: string) {
    if (gamemode !== GameMode.coop && gamemode !== GameMode.competition)
      throw new Error('Unknown game mode');

    this.gameMode = gamemode;
  }

  public getGameMode(): GameMode {
    return this.gameMode;
  }
}