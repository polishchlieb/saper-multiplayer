import createRef from '../createRef';
import parseJSX from '../parseJSX';
import '../sockets';
import globalData from '../store';
import Modal from './common/Modal';
import NicknamePicker from './menu/NicknamePicker';
import WaitingRoom from './waiting-room/WaitingRoom';

export default () => {
  const container = createRef();

  const app = (
    <div>
      <div ref={container}>
        <NicknamePicker />
      </div>
      <Modal />
    </div>
  );

  globalData.domRoot = container.current;

  return app;
}