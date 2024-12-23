import { toast } from 'react-toastify';
import { useDeleteChannelMutation } from '../store/api/channelsApi';
import BaseModal from './BaseModal';
import FormButtons from './FormButtons';

const RemoveModal = ({ onClose, channelId, t }) => {
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
    <BaseModal title={t('modals.delete.title')} onClose={onClose}>
      <p className="lead">{t('modals.delete.confirm')}</p>
      <FormButtons
        onClose={onClose}
        cancelText={t('modals.delete.cancel')}
        submitText={t('modals.delete.submit')}
        handleAction={handleDelete}
        secondBtn="danger"
      />
    </BaseModal>
  );
};

export default RemoveModal;
