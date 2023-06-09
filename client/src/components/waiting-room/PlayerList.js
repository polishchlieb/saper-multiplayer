import parseJSX from '../../parseJSX';
import createRef from '../../createRef';
import globalData from '../../store';
import Player from './Player';

export default () => {
  const ref = createRef();
  globalData.playerList = ref;

  return (
    <div class='playerlist' ref={ref}>
      {globalData.players.map(playerName => (
        <Player name={playerName} />
      ))}
    </div>
  );
}