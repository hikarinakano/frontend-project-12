import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useEditChannelMutation, useGetChannelsQuery } from '../store/api/channelsApi';
import { toast } from 'react-toastify';
import useModalForm from '../hooks/useModalForm';

const RenameModal = ({ onClose, channelId, t }) => {
  const inputRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannel = channels.find((channel) => channel.id === channelId);
  console.log(currentChannel)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.focus();
    }
  }, [currentChannel]);
  const formik = useModalForm({
    onClose,
    t,
    initialValues: { name: currentChannel?.name || '' },
    onSubmit: async (cleanedName) => {
      await editChannel({ id: channelId, name: cleanedName }).unwrap();
      toast.success(t('notifications.channelRenamed'));
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
