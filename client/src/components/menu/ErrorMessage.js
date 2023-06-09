import parseJSX from '../../parseJSX';

export default ({ message }) => {
  return (
    <div class='error'>
      {message}
    </div>
  );
}