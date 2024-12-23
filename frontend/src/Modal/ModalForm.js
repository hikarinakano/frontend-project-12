import { Form } from 'react-bootstrap';
import FormButtons from './FormButtons';

const ModalForm = ({
  inputRef,
  formik,
  t,
  onClose,
  type,
}) => (
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
    <FormButtons
      onClose={onClose}
      cancelText={t(`modals.${type}.cancel`)}
      submitText={t(`modals.${type}.submit`)}
    />
  </Form>
);

export default ModalForm;
