import parseJSX from '../../parseJSX';

export default ({ children, onClick }) => {
  const button = (
    <button class='sbutton'>
      {children.map(t => t.toUpperCase())}
    </button>
  );

  if (onClick)
    button.onclick = onClick;

  return <div>{button}</div>;
}