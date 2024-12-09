import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useGetChannelsQuery, useEditChannelMutation } from '../../store/api/channelsApi';
import { closeModal, selectors } from '../../store/slices/uiSlice';

const EditChannelModal = () => {
  const dispatch = useDispatch();
  const { extra: channelId } = useSelector(selectors.selectModal);
  const [editChannel, { isLoading }] = useEditChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const { t } = useTranslation();
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const inputRef = useRef(null);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .required(t('errors.reqiured'))
      .test(
        'unique',
        t('errors.unique'),
        (value) => !channels.some((channel) => channel.name === value),
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel ? currentChannel.name : '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        await editChannel({ id: channelId, name: cleanedName }).unwrap();
        dispatch(closeModal());
        toast.success(t('notifications.channelRenamed'));
      } catch (err) {
        console.error(err);
        toast.error(t('notifications.connection'));
        dispatch(closeModal());
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.edit.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.edit.formLabel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              required
              name="name"
              id="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting || isLoading}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={handleClose}>
              {t('modals.edit.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {t('modals.edit.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
