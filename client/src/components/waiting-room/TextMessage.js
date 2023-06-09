import parseJSX from '../../parseJSX';
import playerSrc from '../../../assets/player.webp';

export default ({ content, author }) => (
  <div class='text-message'>
    <img src={playerSrc} />
    <span class='message-author'>{author}</span>
    <span>{content}</span>
  </div>
);