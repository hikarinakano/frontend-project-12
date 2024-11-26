import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import usePageTranslation from '../../hooks/usePageTranslation';
import { useGetChannelsQuery, useAddChannelMutation } from '../../store/api/channelsApi';

const AddChannelModal = ({ show, onHide, onChannelAdd }) => {
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

  const formik = useFormik({
    initialValues: {
      name: '',
    },
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
        onHide();
        onChannelAdd(result);
        toast.success(t('notifications.channelCreated'));
      } catch (error) {
        console.error(error);
        toast.error(t('notifications.connection'));
        onHide();
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.add.formLabel')}</Form.Label>
            <Form.Control
              required
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
              autoFocus
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
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('modals.add.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
