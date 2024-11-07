import { Modal, Button } from 'react-bootstrap';
import { useDeleteChannelMutation } from '../../store/api/channelsApi';

const DeleteChannelModal = ({ show, onHide, channelId, onChannelDelete }) => {
  const [deleteChannel] = useDeleteChannelMutation();

  const handleDelete = async () => {
    try {
      await deleteChannel(channelId).unwrap();
      onChannelDelete(channelId); 
      onHide();
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this channel?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;