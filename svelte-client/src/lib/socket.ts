import { code, modal, playerNames, state } from '../store';
import EventEmitter from './EventEmitter';

export const socket = new WebSocket('ws://localhost:3000');
export const socketListener = new EventEmitter();

socket.onmessage = event => {
  const data = JSON.parse(event.data.toString());
  socketListener.emit(data.type, data);
  if (data.type === 'waiting-room') {
    state.set('WAITING_ROOM');
    code.set(data.code);
    playerNames.set(data.playerNames);
    modal.set({ visible: false });
  } else if (data.type === 'start') {
    state.set(
      data.gamemode === 'coop' ? 'COOP' : 'COMPETITION'
    );
  } else if (data.type === 'join') {
    playerNames.update(names => [...names, data.nickname]);
  } else if (data.type === 'error') {
    modal.set({ visible: true, type: 'error', content: data.value });
  } else if (data.type === 'end' && data.reason === 'coop-lost') {
    modal.set({ visible: true, type: 'lost', content: data });
  } else if (data.type === 'end' && data.reason === 'coop-finished') {
    modal.set({ visible: true, type: 'won', content: data });
  } else if (data.type === 'end') {
    modal.set({ visible: true, type: 'winner', content: data });
  }
}