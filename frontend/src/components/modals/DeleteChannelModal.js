import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDeleteChannelMutation } from '../../store/api/channelsApi';
import { closeModal, selectors } from '../../store/slices/uiSlice';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const { extra: channelId } = useSelector(selectors.selectModal);
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    try {
      await deleteChannel(channelId).unwrap();
      dispatch(closeModal());
      toast.success(t('notifications.channelDeleted'));
    } catch (err) {
      console.error(err);
      toast.error(t('notifications.connection'));
    }
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.delete.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleClose}
            disabled={isLoading}
          >
            {t('modals.delete.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {t('modals.delete.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
