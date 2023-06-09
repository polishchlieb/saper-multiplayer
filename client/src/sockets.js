import parseJSX from './parseJSX';
import Field from './components/board/Field';
import globalData from './store';
import WaitingRoom from './components/waiting-room/WaitingRoom';
import Competition from './components/game/Competition';
import Player from './components/waiting-room/Player';
import ErrorMessage from './components/menu/ErrorMessage';
import End from './components/game/End';
import TextMessage from './components/waiting-room/TextMessage';
import Coop from './components/game/Coop';

export const GameState = {
  game: 0,
  waitingRoom: 1
};

import config from '../config.json';
globalData.socket = new WebSocket(config['server-address']);

function handleWaitingRoom(msg) {
  globalData.gameState = GameState.waitingRoom;

  globalData.code = msg.code;
  globalData.players = msg.playerNames;
  globalData.domRoot.firstChild.replaceWith(
    <WaitingRoom />
  );
}

function handleError(msg) {
  console.error('vadim blyat', msg);
  globalData.showModal(
    <div>
      <ErrorMessage message={msg.value} />
    </div>
  );
}

function handleStart(msg) {
  globalData.gameState = GameState.game;

  globalData.audio.pause();
  delete globalData.audio;

  clearInterval(globalData.interval);
  delete globalData.interval;

  if (msg.gamemode === 'competition') {
    const { playerNames } = msg;

    globalData.boards = {};
    for (const playerName of playerNames)
      globalData.boards[playerName] = { width: 10, height: 10, fields: [] };

    for (const board of Object.values(globalData.boards)) {
      for (let y = 0; y < board.height; ++y) {
        for (let x = 0; x < board.width; ++x) {
          board.fields.push({ x, y });
        }
      }
    }

    globalData.domRoot.firstChild.replaceWith(
      <Competition />
    );
  } else if (msg.gamemode === 'coop') {
    globalData.boards = {
      0: { width: 10, height: 10, fields: [] }
    };

    for (const board of Object.values(globalData.boards)) {
      for (let y = 0; y < board.height; ++y) {
        for (let x = 0; x < board.width; ++x) {
          board.fields.push({ x, y });
        }
      }
    }

    globalData.domRoot.firstChild.replaceWith(
      <Coop />
    );
  }
}

function handleDiff(msg) {
  const board = globalData.boards[msg.player || 0]; // 0 for coop

  for (const newField of msg.value) {
    const { x, y } = newField;
    const index = y * board.width + x;

    const oldField = board.fields[index];

    board.fields[index] = {
      ...oldField,
      ...newField
    };

    oldField.dom.replaceWith(
      <Field field={board.fields[index]} boardID={msg.player || 0} />
    );
  }
}

function handleEnd(msg) {
  if (msg.reason === 'coop-finished')
    msg.player = true;
  if (msg.reason === 'coop-lost')
    msg.player = false;

  globalData.domRoot.firstChild.appendChild(
    <End winner={msg.player} time={msg.time} />
  );
}

function handleJoin(msg) {
  globalData.playerList.current.appendChild(
    <Player name={msg.nickname} />
  );
}

function handleDisconnect(msg) {
  if (globalData.gameState !== GameState.waitingRoom)
    return;

  console.log(globalData.playerList);

  const { childNodes } = globalData.playerList.current;
  for (const child of childNodes) {
    const { nodeValue } = child.childNodes[1];
    if (nodeValue === msg.player) {
      child.remove();
    }
  }
}

function handleTextMessage(msg) {
  globalData.chatMessages.appendChild(
    <TextMessage content={msg.content} author={msg.author} />
  );
  globalData.chatMessages.scrollTop = globalData.chatMessages.scrollHeight;
}

function handleOptions(msg) {
  if (msg.gamemode)
    globalData.gamemodeSelector.current.value = msg.gamemode;
}

globalData.socket.onmessage = (event) => {
  const msg = JSON.parse(event.data.toString());
  console.log(msg);

  switch (msg.type) {
    case 'waiting-room':
      return handleWaitingRoom(msg);
    case 'error':
      return handleError(msg);
    case 'start':
      return handleStart(msg);
    case 'diff':
      return handleDiff(msg);
    case 'join':
      return handleJoin(msg);
    case 'disconnect':
      return handleDisconnect(msg);
    case 'end':
      return handleEnd(msg);
    case 'text-message':
      return handleTextMessage(msg);
    case 'options':
      return handleOptions(msg);
  }
}

export function handleLeftClick(index, event) {
  event.preventDefault();
  globalData.socket.send(JSON.stringify({
    type: 'reveal',
    index
  }));
}

export function handleRightClick(index, event) {
  event.preventDefault();
  globalData.socket.send(JSON.stringify({
    type: 'flag',
    index
  }));
}

export function setGameMode(value) {
  globalData.socket.send(JSON.stringify({
    type: 'options',
    gamemode: value
  }))
}