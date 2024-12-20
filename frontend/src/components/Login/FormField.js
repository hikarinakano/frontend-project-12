import { Form } from 'react-bootstrap';

const FormField = ({
  name,
  type = 'text',
  label,
  value,
  onChange,
  isInvalid,
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
  </Form.Group>
);

export default FormField;
