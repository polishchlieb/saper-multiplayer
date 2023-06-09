import createRef from '../../createRef';
import parseJSX from '../../parseJSX';
import globalData from '../../store';

export default () => {
  const ref = createRef();
  const textareaRef = createRef();

  const chat = (
    <div>
      <div class='chat-messages' ref={ref}>
        <span class='first-message'>
          dzien dobry.
        </span>
      </div>
      <textarea ref={textareaRef}
       placeholder='wpisz se tu wiadomosc' />
    </div>
  );

  textareaRef.current.onkeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      globalData.socket.send(JSON.stringify({
        type: 'text-message',
        content: event.target.value
      }));
      textareaRef.current.value = '';
    }
  }

  globalData.chatMessages = ref.current;

  return chat;
}