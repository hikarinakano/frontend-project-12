import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../store/slices/uiSlice';
import BaseModal from '../BaseModal';
import AddChannelForm from './AddChannelForm';

const AddChannelModal = ({ onClose, t }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuccess = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <BaseModal title={t('modals.add.title')} onClose={onClose}>
      <AddChannelForm
        inputRef={inputRef}
        t={t}
        onClose={onClose}
        onSuccess={handleSuccess}
      />
    </BaseModal>
  );
};

export default AddChannelModal;
