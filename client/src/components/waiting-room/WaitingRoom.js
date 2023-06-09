import parseJSX from '../../parseJSX';
import createRef from '../../createRef';

import globalData from '../../store';

import Button from '../common/Button';
import PlayerList from './PlayerList';

import musick from '../../../assets/musick.mp3';
import fireworksSrc from '../../../assets/fireworks.gif';
import TextChat from './TextChat';
import Select from '../common/Select';
import { setGameMode } from '../../sockets';

export default () => {
  const ref = createRef();

  globalData.audio = new Audio(musick);
  globalData.audio.volume = 0.2;
  globalData.audio.loop = true;
  globalData.audio.play();

  globalData.interval = setInterval(() => {
    if (!ref.current)
      return;

    const randomX = Math.floor(window.innerWidth * Math.random());
    const randomY = Math.floor(window.innerHeight * Math.random());

    ref.current.style.left = randomX + 'px';
    ref.current.style.top = randomY + 'px';
  }, 100);

  const handleClick = () => {
    globalData.socket.send(JSON.stringify({
      type: 'start'
    }));
  }

  const handleGameMode = (event) => {
    setGameMode(event.target.value);
  }

  const gameModes = [
    { value: 'competition', text: 'wielki pojedynek saperski' },
    { value: 'coop', text: 'coop' }
  ];

  const boardSizes = [
    { value: 'default', text: '10x10' }
  ];

  const gamemodeSelectorRef = createRef();
  globalData.gamemodeSelector = gamemodeSelectorRef;

  return (
    <div class='container'>
      <h1>saper multiplayer</h1>
      <h2>Kod gry: {globalData.code}</h2>

      <PlayerList />
      
      <div class='game-options'>
        <Select
          id='gamemode' title='Tryb gry: ' options={gameModes}
          onChange={handleGameMode}
          ref={gamemodeSelectorRef} />
        <Select
          id='boardsize' title='Rozmiar planszy: ' options={boardSizes} />
        <Button onClick={handleClick}>graj!!</Button>
      </div>

      <TextChat />

      <img src={fireworksSrc} class='fireworks' ref={ref}></img>
    </div>
  );
}