import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../store/api/channelsApi';
import { setCurrentChannel } from '../store/slices/uiSlice';
import useModalForm from '../hooks/useModalForm';
import BaseModal from './BaseModal';
import ModalForm from './ModalForm';

const AddModal = ({ onClose, t }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useModalForm({
    onClose,
    t,
    initialValues: { name: '' },
    onSubmit: async (cleanedName) => {
      const response = await addChannel({ name: cleanedName, username }).unwrap();
      dispatch(setCurrentChannel(response.id));
      toast.success(t('notifications.channelCreated'));
    },
  });

  return (
    <BaseModal title={t('modals.add.title')} onClose={onClose}>
      <ModalForm
        type="add"
        inputRef={inputRef}
        formik={formik}
        t={t}
        onClose={onClose}
      />
    </BaseModal>
  );
};

export default AddModal;
