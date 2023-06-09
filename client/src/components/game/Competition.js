import parseJSX from '../../parseJSX';
import globalData from '../../store';
import Board from '../board/Board'

export default () => {
  return (
    <div>
      <div class='game'>
        {Object.keys(globalData.boards)
          .map(playerName => (
            <div>
              <h1>{playerName}</h1>
              <Board id={playerName} />
            </div>
          ))
        }
      </div>
    </div>
  );
}