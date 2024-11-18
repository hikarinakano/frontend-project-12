import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useGetChannelsQuery, useAddChannelMutation } from '../../store/api/channelsApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { usePageTranslation } from '../../hooks/usePageTranslation';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';

const AddChannelModal = ({ show, onHide, onChannelAdd }) => {
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();
  const errTranslation = usePageTranslation('errors');
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, errTranslation('length'))
      .max(20, errTranslation('length'))
      .required(errTranslation('required'))
      .test('unique', errTranslation('unique'), (value) => {
        return !channels.some((channel) => channel.name === value);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const cleanedName = filter.clean(values.name);
        const result = await addChannel({ 
          name: cleanedName,
          username,
        }).unwrap();
        resetForm();
        onHide();
        onChannelAdd({
          ...result,
          username,
        });
        toast.success(t('notifications.channelCreated'));
      } catch (error) {
        console.error('Failed to add channel:', error);
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
            <Form.Label className='visually-hidden' htmlFor='name'>{t('modals.add.formLabel')}</Form.Label>
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