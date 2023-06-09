import parseJSX from '../../parseJSX';
import Board from '../board/Board'

export default () => {
  return (
    <div>
      <div class='game'>
        <Board id={0} />
      </div>
    </div>
  );
}