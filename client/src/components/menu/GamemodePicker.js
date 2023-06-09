import parseJSX from '../../parseJSX';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import globalData from '../../store';

export default () => {
  const createGame = () => {
    globalData.socket.send(JSON.stringify({
      type: 'create-game'
    }));
  }

  const joinGame = () => {
    globalData.socket.send(JSON.stringify({
      type: 'join-game',
      code: globalData.code
    }));
  }

  const { nickname } = globalData;
  return (
    <div>
      <h1>witanie, {nickname}</h1>
      <div class='section'>
        <Button onClick={createGame}>utwórz grę</Button>
      </div>
      <div class='section'>
        <TextInput onChange={v => globalData.code = v} />
        <Button onClick={joinGame}>dołącz do gry</Button>
      </div>
    </div>
  );
}