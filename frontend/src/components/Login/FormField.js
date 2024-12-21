import { Form } from 'react-bootstrap';

const FormField = ({
  name,
  type = 'text',
  label,
  value,
  onChange,
  isInvalid,
  error,
  inputRef,
  autoComplete,
}) => (
  <Form.Group className="form-floating mb-3">
    <Form.Control
      type={type}
      onChange={onChange}
      value={value}
      placeholder={label}
      name={name}
      id={name}
      autoComplete={autoComplete}
      isInvalid={isInvalid}
      required
      ref={inputRef}
    />
    <label htmlFor={name}>{label}</label>
    {isInvalid && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
  </Form.Group>
);

export default FormField;
