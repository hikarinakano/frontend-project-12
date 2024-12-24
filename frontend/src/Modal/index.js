import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal, uiSelectors } from '../store/slices/uiSlice';
import AddModal from './AddChannelModal';
import RenameModal from './RenameChannelModal';
import RemoveModal from './RemoveChannelModal';

const modalComponents = {
  adding: AddModal,
  renaming: RenameModal,
  removing: RemoveModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { type, isOpen, extra } = useSelector(uiSelectors.selectModal);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
  };
  if (!type) return null;
  const ChannelModal = modalComponents[type];
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <ChannelModal
        onClose={handleClose}
        channelId={extra}
        t={t}
      />
    </Modal>
  );
};

export default ModalComponent;
