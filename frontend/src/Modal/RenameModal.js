import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEditChannelMutation } from '../store/api/channelsApi';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import getValidationSchema from './validationSchema';

const RenameModal = ({ isOpen, onClose, channelId, t }) => {
  const inputRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const channels = useSelector((state) => state.channels.entities) || [];
  const currentChannel = channels.find((channel) => channel.id === channelId);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const formik = useFormik({
    initialValues: { name: currentChannel?.name || '' },
    validationSchema: getValidationSchema(t, channels),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        await editChannel({ id: channelId, name: cleanedName }).unwrap();
        onClose();
        toast.success(t('notifications.channelRenamed'));
      } catch (err) {
        toast.error(t('errors.networkError'));
        onClose();
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.edit.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.edit.formLabel')}
            </Form.Label>
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
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={onClose}>
              {t('modals.edit.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.edit.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameModal;
