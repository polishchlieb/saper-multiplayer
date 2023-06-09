import Server from './Server';

const server = new Server();
export default server;

import { port } from '../config.json';
server.listen(port);
