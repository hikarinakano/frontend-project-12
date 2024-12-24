import { Button } from 'react-bootstrap';

const FormButtons = ({
  onClose,
  cancelText,
  submitText,
  handleAction,
  secondBtn,
  disabled,
}) => (
  <div className="d-flex justify-content-end gap-2 mt-3">
    <Button variant="secondary" onClick={onClose} disabled={disabled}>
      {cancelText}
    </Button>
    <Button 
      variant={secondBtn || 'primary'} 
      type="submit" 
      onClick={handleAction} 
      disabled={disabled}
    >
      {submitText}
    </Button>
  </div>
);

export default FormButtons;
