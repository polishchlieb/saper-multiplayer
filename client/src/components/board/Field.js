import parseJSX from '../../parseJSX';
import { handleLeftClick, handleRightClick } from '../../sockets';
import bombSrc from '../../../assets/bomb.svg';
import flagSrc from '../../../assets/flag.svg';
import globalData from '../../store';

export default ({ field, boardID }) => {
  console.log(globalData.boards);
  const { width } = globalData.boards[boardID];

  const { x, y } = field;
  const index = y * width + x;

  const { hasBomb, isVisible, nearBombs, isFlagged } = field;
  const className = 'field' + (isVisible ? ' field-visible' : '');

  let contents;
  if (hasBomb)
    contents = <img src={bombSrc} />;
  else if (isVisible)
    contents = nearBombs;
  else if (isFlagged)
    contents = <img src={flagSrc} />;

  const element = (
    <div class={className}>
      {contents}
    </div>
  );
  field.dom = element;

  if (boardID === globalData.nickname || boardID === 0) {
    element.onclick = handleLeftClick.bind(null, index);
    element.oncontextmenu = handleRightClick.bind(null, index);
  }

  return element;
}