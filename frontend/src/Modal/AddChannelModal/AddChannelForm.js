import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import FormButtons from '../FormButtons';
import getValidationSchema from '../validationSchema';
import { useAddChannelMutation, useGetChannelsQuery } from '../../store/api/channelsApi';

const AddChannelForm = ({
  inputRef,
  t,
  onClose,
  onSuccess,
}) => {
  const [addChannel] = useAddChannelMutation();
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: getValidationSchema(t, channels),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        const response = await addChannel({ name: cleanedName, username }).unwrap();
        onSuccess(response.id);
        toast.success(t('notifications.channelCreated'));
        onClose();
      } catch (err) {
        toast.error(t('errors.networkError'));
        onClose();
      }
    },
  });

  return (
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
      <FormButtons
        onClose={onClose}
        cancelText={t('modals.add.cancel')}
        submitText={t('modals.add.submit')}
        disabled={formik.isSubmitting}
      />
    </Form>
  );
};

export default AddChannelForm; 