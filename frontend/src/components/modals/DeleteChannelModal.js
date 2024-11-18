import { Modal, Button } from 'react-bootstrap';
import { useDeleteChannelMutation } from '../../store/api/channelsApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const DeleteChannelModal = ({ show, onHide, channelId, onChannelDelete }) => {
  const [deleteChannel] = useDeleteChannelMutation();
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await deleteChannel(channelId).unwrap();
      onChannelDelete(channelId); 
      onHide();
      toast.success(t('notifications.channelDeleted'))
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.delete.confirm')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('modals.delete.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
         {t('modals.delete.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;