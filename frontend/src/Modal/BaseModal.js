import { Modal } from 'react-bootstrap';

const BaseModal = ({ title, onClose, children }) => (
  <>
    <Modal.Header closeButton onHide={onClose}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
  </>
);

export default BaseModal; 