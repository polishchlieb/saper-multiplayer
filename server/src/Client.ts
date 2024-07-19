import WebSocket, { Data } from 'ws';
import Message, { MessageType, WinReason } from './Message';
import ClientHandler from './ClientHandler';
import server from '.';
import Room from './Room';
import GameMode from './GameMode';

const POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOP23456789';
function randomString(length = 6) {
  let result = '';
  for (let i = 0; i < length; ++i)
    result += POSSIBLE_CHARS[
      Math.floor(Math.random() * POSSIBLE_CHARS.length)
    ];
  return result;
}

export default class Client {
  public constructor(private socket: WebSocket) {}

  public nickname: string;

  public listen() {
    this.socket.on('message', this.handleMessage.bind(this));
    this.socket.on('close', this.close.bind(this));
  }

  public send(message: Message) {
    this.socket.send(JSON.stringify(message));
  }

  public sendRaw(message: any) {
    this.socket.send(message);
  }

  public close() {
    for (const handler of this.handlers) {
      handler.handleDisconnection(this);
      handler.clients = handler.clients.filter(
        c => c !== this
      );
    }
    this.handlers = [];
    this.socket.close();
  }

  private handleMessage(data: Data) {
    if (typeof data !== 'string')
      return this.close();

    let message: Message;
    try {
      message = JSON.parse(data);
    } catch {
      return this.close();
    }

    if (typeof message.type !== 'string')
      return this.close();

    if (message.type === MessageType.nickname)
      return this.handleNicknameMessage(message);

    if (!this.nickname)
      return this.close();

    switch (message.type) {
      case MessageType.createGame:
        return this.handleCreateGameMessage(message);
      case MessageType.joinGame:
        return this.handleJoinGameMessage(message);
      case MessageType.start:
        return this.handleStartMessage(message);
      case MessageType.reveal:
        return this.handleRevealMessage(message);
      case MessageType.flag:
        return this.handleFlagMessage(message);
      case MessageType.textMessage:
        return this.handleTextMessage(message);
      case MessageType.options:
        return this.handleOptionsMessage(message);
    }
  }

  private handleNicknameMessage(message: Message) {
    const { value } = message;
    if (typeof value !== 'string' || value.length < 3
     || value.length > 20 || !/[A-Za-z \-\.0-9]+/.test(value))
      return this.close();
    this.nickname = value;
  }

  private handleOptionsMessage(message: Message) {
    const { gamemode } = message;
    if (gamemode !== 'coop' && gamemode !== 'competition')
      return this.close();
    
    const room = this.handlers[0] as Room;
    if (room.isDuringGame)
      return this.close();
    
    room.setGameMode(gamemode);

    room.broadcast({
      type: MessageType.options,
      gamemode
    });
  }

  private handleCreateGameMessage(message: Message) {
    if (this.handlers.length)
      return this.close();

    const room = new Room(randomString());
    server.rooms.push(room);
    room.join(this);
  }

  private handleJoinGameMessage(message: Message) {
    if (this.handlers.length)
      return this.close();

    const { code } = message;
    if (typeof code !== 'string' || code.length !== 6)
      return this.send({
        type: MessageType.error,
        value: 'zły kod!!!!1'
      });

    const room = server.rooms.find(r => r.code === code);
    if (!room)
      return this.send({
        type: MessageType.error,
        value: 'zły kod!!!!1'
      });
    room.join(this);
  }

  private handleStartMessage(message: Message) {
    if (!this.handlers.length)
      return this.close();

    const room = this.handlers[0] as Room;
    if (room.isDuringGame) // must be sent in waiting room
      return this.close();

    room.start();
  }

  private handleRevealMessage(message: Message) {
    if (!this.handlers.length)
      return this.close();

    const { index } = message;
    if (typeof index !== 'number')
      return this.close();

    const room = this.handlers[0] as Room;
    
    if (room.getGameMode() === GameMode.competition) {
      const board = room.boards[this.nickname];
      if (board.ended) return;
      const field = board.fields[index];
      if (!field || board.ended)
        return this.close();
      
      const difference = board.reveal(field);

      room.broadcast({
        type: MessageType.diff,
        player: this.nickname,
        value: difference
      });

      if (!board.ended)
        return;

      if (board.isFinished)
        room.broadcast({
          type: MessageType.end,
          player: this.nickname,
          time: board.time,
          reason: WinReason.playerWon
        });

      if (board.lost) {
        const other = room.clients
          .filter(c => c.nickname !== this.nickname)[0]
          .nickname;
        room.broadcast({
          type: MessageType.end,
          player: other,
          time: board.time,
          reason: WinReason.opponentLost
        });
      }

      setTimeout(() => {
        room.enterWaitingRoom();
      }, 5000);
    }
      
    if (room.getGameMode() === GameMode.coop) {
      const board = room.boards[0];
      if (board.ended) return;
      const field = board.fields[index];
      if (!field || board.ended)
        return this.close();
      
      const difference = board.reveal(field);

      room.broadcast({
        type: MessageType.diff,
        value: difference
      });

      if (!board.ended)
        return;

      if (board.isFinished)
        room.broadcast({
          type: MessageType.end,
          reason: WinReason.coopFinished,
          time: board.time
        });
      else
        room.broadcast({
          type: MessageType.end,
          reason: WinReason.coopLost,
          time: board.time
        });

      setTimeout(() => {
        room.enterWaitingRoom();
      }, 5000);
    }
  }

  private handleFlagMessage(message: Message) {
    if (!this.handlers.length)
      return this.close();

    const { index } = message;
    if (typeof index !== 'number')
      return this.close();

    const room = this.handlers[0] as Room;
    
    if (room.getGameMode() === GameMode.competition) {
      const board = room.boards[this.nickname];
      if (board.ended) return;
      if (!board.fields[index])
        return this.close();

      const difference = board.toggleFlag(index);
      room.broadcast({
        type: MessageType.diff,
        player: this.nickname,
        value: difference
      });
    } else if (room.getGameMode() === GameMode.coop) {
      const board = room.boards[0];
      if (board.ended) return;
      if (!board.fields[index])
        return this.close();

      const difference = board.toggleFlag(index);
      room.broadcast({
        type: MessageType.diff,
        value: difference
      });
    }
  }

  private handleTextMessage(message: Message) {
    if (!this.handlers.length)
      return this.close();

    const { content } = message;
    if (typeof content !== 'string')
      return this.close();

    const room = this.handlers[0] as Room;
    if (room.isDuringGame) // must be sent in waiting room
      return this.close();

    room.broadcast({
      type: MessageType.textMessage,
      author: this.nickname,
      content
    });
  }

  public handlers: ClientHandler[] = [];
}