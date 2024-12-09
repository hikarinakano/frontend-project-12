import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useGetChannelsQuery, useAddChannelMutation } from '../../store/api/channelsApi';
import { closeModal, setCurrentChannel } from '../../store/slices/uiSlice';
import usePageTranslation from '../../hooks/usePageTranslation';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();
  const errTranslation = usePageTranslation('errors');
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(errTranslation('required'))
      .min(3, errTranslation('length'))
      .max(20, errTranslation('length'))
      .test(
        'unique',
        errTranslation('unique'),
        (value) => {
          if (!value) return true;
          const trimmedValue = value.trim().toLowerCase();
          return !channels.some(
            (channel) => (
              channel.name.trim().toLowerCase() === trimmedValue
            ),
          );
        },
      ),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        const result = await addChannel({
          name: cleanedName,
          username,
        }).unwrap();

        resetForm();
        dispatch(setCurrentChannel(result.id));
        dispatch(closeModal());
        toast.success(t('notifications.channelCreated'));
      } catch (error) {
        console.error(error);
        toast.error(t('notifications.connection'));
        dispatch(closeModal());
      }
    },
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.add.formLabel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              required
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.add.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {t('modals.add.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
