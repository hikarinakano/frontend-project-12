import { Modal, Button } from 'react-bootstrap';
import { useDeleteChannelMutation } from '../store/api/channelsApi';
import { toast } from 'react-toastify';

const DeleteModal = ({ isOpen, onClose, channelId, t }) => {
  const [deleteChannel] = useDeleteChannelMutation();

  const handleDelete = async () => {
    try {
      await deleteChannel(channelId).unwrap();
      onClose();
      toast.success(t('notifications.channelDeleted'));
    } catch (err) {
      toast.error(t('errors.networkError'));
      onClose();
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.delete.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onClose}>
            {t('modals.delete.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('modals.delete.submit')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default DeleteModal; 