import { writable, type Writable } from 'svelte/store';

type State = 'NICKNAME_PICKER' | 'MENU' | 'WAITING_ROOM' | 'COOP' | 'COMPETITION';

export const nickname: Writable<string> = writable('');
export const state: Writable<State> = writable('NICKNAME_PICKER');
export const code: Writable<string> = writable('');
export const playerNames: Writable<string[]> = writable([]);

type Modal = {
  visible: boolean;
  type?: string;
  content?: any;
};
export const modal: Writable<Modal> = writable({ visible: false });