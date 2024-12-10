import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useRef, useEffect } from 'react';
import {
  closeModal,
  uiSelectors,
  setCurrentChannel,
  setDefaultChannel,
} from '../store/slices/uiSlice';
import {
  useAddChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
  useGetChannelsQuery,
} from '../store/api/channelsApi';
import renderModalContent from '../modalLogic/renderModalContent';
import getValidationSchema from '../modalLogic/validationSchema';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { type, isOpen, extra: channelId } = useSelector(uiSelectors.selectModal);
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const [editChannel] = useEditChannelMutation();
  const [deleteChannel] = useDeleteChannelMutation();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const currentChannel = channels.find((channel) => channel.id === channelId);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (inputRef.current) {
      if (type === 'adding') {
        inputRef.current.focus();
      } else if (type === 'renaming') {
        inputRef.current.select();
      }
    }
  }, [type]);

  const formik = useFormik({
    initialValues: {
      name: type === 'renaming' ? currentChannel?.name : '',
    },
    validationSchema: type !== 'removing' ? getValidationSchema(t, channels) : null,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (type === 'adding') {
          const trimmedName = values.name.trim();
          const cleanedName = filter.clean(trimmedName);
          const result = await addChannel({ name: cleanedName, username }).unwrap();
          dispatch(setCurrentChannel(result.id));
          resetForm();
        } else if (type === 'renaming') {
          const trimmedName = values.name.trim();
          const cleanedName = filter.clean(trimmedName);
          await editChannel({ id: channelId, name: cleanedName }).unwrap();
        } else if (type === 'removing') {
          if (currentChannelId === channelId) {
            dispatch(setDefaultChannel());
          }
          await deleteChannel(channelId).unwrap();
        }
        dispatch(closeModal());
        const notifications = {
          adding: 'channelCreated',
          renaming: 'channelRenamed',
          removing: 'channelDeleted',
        };
        toast.success(t(`notifications.${notifications[type]}`));
      } catch (err) {
        toast.error(t('notifications.connection'));
        dispatch(closeModal());
      }
    },
  });

  return (
    <Modal show={isOpen} onHide={handleClose}>
      {renderModalContent({
        type,
        handleClose,
        formik,
        inputRef,
        t,
      })}
    </Modal>
  );
};

export default ModalComponent;
