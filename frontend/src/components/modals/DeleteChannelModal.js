import { Modal, Button } from 'react-bootstrap';
import { useDeleteChannelMutation } from '../../store/api/channelsApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const DeleteChannelModal = ({ show, onHide, channelId, onChannelDelete }) => {
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await deleteChannel(channelId).unwrap();
      onChannelDelete(channelId);
      onHide();
      toast.success(t('notifications.channelDeleted'));
    } catch (err) {
      console.error('Failed to delete channel:', err);
      toast.error(t('notifications.connection'));
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.delete.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={onHide}
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