import createRef from '../../createRef';
import parseJSX from '../../parseJSX';
import globalData from '../../store';

export default () => {
  globalData.wrapperRef = createRef();
  globalData.modalRef = createRef();

  const modalWrapper = (
    <div class='modal-wrapper' ref={globalData.wrapperRef}
     style={{ display: 'none' }}>
      <div class='modal' ref={globalData.modalRef}
       style={{ display: 'none' }}>
      </div>
    </div>
  );

  globalData.wrapperRef.current.onclick = () => {
    globalData.modalRef.current.style.display =
      globalData.wrapperRef.current.style.display = 'none';
  }

  globalData.showModal = (content) => {
    globalData.modalRef.current.style.display =
      globalData.wrapperRef.current.style.display = 'flex';
    globalData.modalRef.current.childNodes
      .forEach(child => child.remove());
    globalData.modalRef.current.appendChild(content);
  }

  return modalWrapper;
}