import Client from './Client';

export default abstract class ClientHandler {
  public clients: Client[] = [];
  public abstract join(client: Client): void;
  public abstract handleDisconnection(client: Client): void;
}