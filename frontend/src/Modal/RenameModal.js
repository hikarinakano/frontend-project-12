import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useEditChannelMutation, useGetChannelsQuery } from '../store/api/channelsApi';
import useModalForm from '../hooks/useModalForm';
import BaseModal from './BaseModal';
import ModalForm from './ModalForm';

const RenameModal = ({ onClose, channelId, t }) => {
  const inputRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannel = channels.find((channel) => channel.id === channelId);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.focus();
    }
  }, [currentChannel]);

  const formik = useModalForm({
    onClose,
    t,
    initialValues: { name: currentChannel?.name || '' },
    onSubmit: async (cleanedName) => {
      await editChannel({ id: channelId, name: cleanedName }).unwrap();
      toast.success(t('notifications.channelRenamed'));
    },
  });

  return (
    <BaseModal title={t('modals.edit.title')} onClose={onClose}>
      <ModalForm
        type="edit"
        inputRef={inputRef}
        formik={formik}
        t={t}
        onClose={onClose}
      />
    </BaseModal>
  );
};

export default RenameModal;
