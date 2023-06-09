import parseJSX from '../../parseJSX';

export default ({ options, onChange, title, id, ref = {} }) => {
  const select = (
    <select id={id} ref={ref}>
      {options.map(({ value, text }) => (
        <option value={value}>{text}</option>
      ))}
    </select>
  );

  if (onChange)
    select.onchange = onChange;

  return (
    <div class='sselect'>
      <label for={id}>{title}</label>
      {select}
    </div>
  );
}