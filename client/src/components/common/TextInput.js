import parseJSX from '../../parseJSX';

export default ({ onChange }) => {
  const input = <input type='text' class='sinput' />;

  if (onChange)
    input.oninput = e => onChange(e.target.value);

  return <div>{input}</div>;
}