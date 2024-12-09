import { useDispatch, useSelector } from 'react-redux';
import { selectors, closeModal, setCurrentChannel } from '../store/slices/uiSlice';
import AddChannelModal from './modals/AddChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';
import EditChannelModal from './modals/EditChannelModal';

const modals = {
  adding: AddChannelModal,
  removing: DeleteChannelModal,
  renaming: EditChannelModal,
};

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(selectors.selectModal);
  const { isOpen, type, extra } = modalInfo;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChannelAdd = (channel) => {
    dispatch(setCurrentChannel(channel.id));
    handleClose();
  };

  const handleChannelDelete = () => {
    handleClose();
  };

  const handleChannelEdit = () => {
    handleClose();
  };

  const CurrentModal = modals[type];

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100 bg-light">
          {children}
        </div>
      </div>
      {isOpen && CurrentModal && (
        <CurrentModal
          show={isOpen}
          onHide={handleClose}
          channelId={extra}
          onChannelAdd={handleChannelAdd}
          onChannelDelete={handleChannelDelete}
          onChannelEdit={handleChannelEdit}
        />
      )}
    </div>
  );
};

export default AppWrapper;
