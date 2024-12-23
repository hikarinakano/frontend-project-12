import { Button } from 'react-bootstrap';

const FormButtons = ({
  onClose,
  cancelText,
  submitText,
  handleAction,
  secondBtn,
}) => (
  <div className="d-flex justify-content-end gap-2 mt-3">
    <Button variant="secondary" onClick={onClose}>
      {cancelText}
    </Button>
    <Button variant={secondBtn || 'primary'} type="submit" onClick={handleAction}>
      {submitText}
    </Button>
  </div>
);

export default FormButtons;
