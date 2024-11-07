import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useGetChannelsQuery, useEditChannelMutation } from '../../store/api/channelsApi';

const EditChannelModal = ({ show, onHide, onChannelEdit }) => {
  const { data: channels = [] } = useGetChannelsQuery();
  const [editChannel] = useEditChannelMutation();

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
      name: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await addChannel({ name: values.name }).unwrap();
        resetForm();
        onHide();
        onChannelAdd(result);
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
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              placeholder="Enter channel name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal; 