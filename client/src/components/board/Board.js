import parseJSX from '../../parseJSX';
import globalData from '../../store';
import Field from './Field';

export default ({ id }) => {
  const { width, fields } = globalData.boards[id];

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    width: `${42 * width}px`
  };

  return (
    <div class='board' style={style}>
      {fields.map(field => (
        <Field field={field} boardID={id} />
      ))}
    </div>
  );
}