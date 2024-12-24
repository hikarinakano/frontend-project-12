import { useRef, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import BaseModal from '../BaseModal';
import RenameChannelForm from './RenameChannelForm';

const RenameChannelModal = ({ onClose, channelId, t }) => {
  const inputRef = useRef(null);
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannel = channels.find((channel) => channel.id === channelId);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.focus();
    }
  }, [currentChannel]);

  return (
    <BaseModal title={t('modals.edit.title')} onClose={onClose}>
      <RenameChannelForm
        inputRef={inputRef}
        t={t}
        onClose={onClose}
        channelId={channelId}
        initialName={currentChannel?.name}
      />
    </BaseModal>
  );
};

export default RenameChannelModal;
