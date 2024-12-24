import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import FormButtons from './FormButtons';
import getValidationSchema from './validationSchema';
import { useEditChannelMutation, useGetChannelsQuery } from '../store/api/channelsApi';

const RenameChannelForm = ({
  inputRef,
  t,
  onClose,
  channelId,
  initialName,
}) => {
  const [editChannel] = useEditChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();

  const formik = useFormik({
    initialValues: { name: initialName || '' },
    validationSchema: getValidationSchema(t, channels),
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        await editChannel({ id: channelId, name: cleanedName }).unwrap();
        toast.success(t('notifications.channelRenamed'));
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
      <FormButtons
        onClose={onClose}
        cancelText={t('modals.edit.cancel')}
        submitText={t('modals.edit.submit')}
        disabled={formik.isSubmitting}
      />
    </Form>
  );
};

export default RenameChannelForm; 