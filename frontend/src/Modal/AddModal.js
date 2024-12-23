import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAddChannelMutation } from '../store/api/channelsApi';
import { setCurrentChannel } from '../store/slices/uiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useModalForm from '../hooks/useModalForm';

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
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modals.add.formLabel')}
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
              {t('modals.add.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.add.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddModal;
