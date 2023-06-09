import parseJSX from '../../parseJSX';
import playerSrc from '../../../assets/player.webp';

export default ({ name }) => {
  return (
    <div class='player'>
      <img src={playerSrc} class='playerimage' />
      {name}
    </div>
  );
}