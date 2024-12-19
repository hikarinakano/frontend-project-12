import { Form } from 'react-bootstrap';

const FormField = ({
  name,
  type = 'text',
  value,
  onChange,
  isInvalid,
  error,
  label,
  inputRef,
  autoComplete,
}) => (
  <Form.Group className="form-floating mb-3">
    <Form.Control
      type={type}
      placeholder={label}
      name={name}
      id={name}
      autoComplete={autoComplete}
      required
      ref={inputRef}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
    />
    <Form.Label htmlFor={name}>{label}</Form.Label>
    <div className="invalid-tooltip">
      {error}
    </div>
  </Form.Group>
);

export default FormField;