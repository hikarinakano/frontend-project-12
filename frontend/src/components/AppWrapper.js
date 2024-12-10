import { useSelector } from 'react-redux';
import { uiSelectors } from '../store/slices/uiSlice';
import ModalComponent from './Modal';

const AppWrapper = ({ children }) => {
  const modalInfo = useSelector(uiSelectors.selectModal);
  const { isOpen } = modalInfo;

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100 bg-light">
          {children}
        </div>
      </div>
      {isOpen && <ModalComponent />}
    </div>
  );
};

export default AppWrapper;
