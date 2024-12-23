import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal, uiSelectors } from '../store/slices/uiSlice';
import AddModal from '../Modal/AddModal';
import RenameModal from '../Modal/RenameModal';
import RemoveModal from './RemoveModal';

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
  const SpecificModal = modalComponents[type];
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <SpecificModal
        onClose={handleClose}
        channelId={extra}
        t={t}
      />
    </Modal>
  );
};

export default ModalComponent;
