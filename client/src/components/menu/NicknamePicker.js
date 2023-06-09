import createRef from '../../createRef';
import parseJSX from '../../parseJSX';
import globalData from '../../store';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import ErrorMessage from './ErrorMessage';
import GamemodePicker from './GamemodePicker';

export default () => {
  const ref = createRef();

  const setError = (message) => {
    const element = <ErrorMessage message={message} />;

    if (ref.current.childNodes.length === 4)
      ref.current.lastChild.replaceWith(element);
    else
      ref.current.appendChild(element);
  }

  const handleClick = () => {
    const { nickname } = globalData;
    if (nickname.length < 3 || nickname.length > 20)
      return setError('pienkna nazwa musi mieć od 3 do 20 znakuw');
    if (!/[A-Za-z \-\.0-9]+/.test(nickname))
      return setError('pienkna nazwa po polsku, prosze');

    globalData.domRoot.firstChild.replaceWith(
      <GamemodePicker />
    );
    globalData.socket.send(JSON.stringify({
      type: 'nickname',
      value: nickname
    }));

    setInterval(() => {
      globalData.socket.send(JSON.stringify({
        type: 'ping'
      }));
    }, 3000);
  }

  return (
    <div ref={ref}>
      <h1>wybierz sobie jakomś ładnom nazwe:</h1>
      <TextInput onChange={v => globalData.nickname = v} />
      <Button onClick={handleClick}>zatfjerć</Button>
    </div>
  );
}