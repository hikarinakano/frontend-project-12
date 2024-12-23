import { Form } from 'react-bootstrap';
import FormButtons from './FormButtons';

const ModalForm = ({ 
  inputRef, 
  formik, 
  t, 
  onClose, 
  type,
  handleDelete 
}) => {
  const buttonProps = {
    onClose,
    cancelText: t(`modals.${type}.cancel`),
    submitText: t(`modals.${type}.submit`),
    ...(type === 'delete' ? {
      handleAction: handleDelete,
      secondBtn: 'danger',
    } : {
      type: 'submit'
    })
  };

  if (type === 'delete') {
    return (
      <>
        <p className="lead">{t('modals.delete.confirm')}</p>
        <FormButtons {...buttonProps} />
      </>
    );
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label className="visually-hidden" htmlFor="name">
          {t(`modals.${type}.formLabel`)}
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
      <FormButtons {...buttonProps} />
    </Form>
  );
};

export default ModalForm;