import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useGetChannelsQuery, useEditChannelMutation } from '../../store/api/channelsApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const EditChannelModal = ({ show, onHide, onChannelEdit, channelId }) => {
  const { data: channels = [] } = useGetChannelsQuery();
  const [editChannel] = useEditChannelMutation();
  const { t } = useTranslation();
  const currentChannel = channels.find(channel => channel.id === channelId);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'From 3 to 20 characters')
      .max(20, 'From 3 to 20 characters')
      .required('Required')
      .test('unique', 'Must be unique', (value) => {
        return !channels.some((channel) => channel.name === value);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel ? currentChannel.name : '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const cleanedResult = filter.clean(values.name);
        const result = await editChannel({ id: channelId, name: cleanedResult }).unwrap();
        resetForm();
        onChannelEdit(result);
        onHide();
        toast.success(t('notifications.channelRenamed'))
      } catch (err) {
        console.error('Failed to add channel:', err);
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
        <Modal.Title>{t('modal.edit.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>{t('modal.edit.formLabel')}</Form.Label>
            <Form.Control
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
              autoFocus
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.edit.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('modal.edit.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal; 