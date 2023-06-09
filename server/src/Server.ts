import WebSocket from 'ws';
import Client from './Client';
import Room from './Room';

export default class Server {
  private server: WebSocket.Server;

  public rooms: Room[] = [];

  public listen(port: number) {
    this.server = new WebSocket.Server({ port });
    this.server.on('listening', () => {
      console.log('dzien dobry!');
    });

    this.server.on('connection', (socket) => {
      const client = new Client(socket);
      client.listen();
    });
  }
}