import { Modal, Form, Button } from 'react-bootstrap';

const renderModalContent = ({
  type,
  handleClose,
  formik,
  inputRef,
  t,
}) => {
  const modalType = type === 'adding' ? 'add' : 'edit';

  switch (type) {
    case 'removing':
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.delete.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="lead">{t('modals.delete.confirm')}</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('modals.delete.cancel')}
              </Button>
              <Button variant="danger" onClick={formik.handleSubmit}>
                {t('modals.delete.submit')}
              </Button>
            </div>
          </Modal.Body>
        </>
      );

    case 'adding':
    case 'renaming':
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{t(`modals.${modalType}.title`)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label className="visually-hidden" htmlFor="name">
                  {t(`modals.${modalType}.formLabel`)}
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
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={handleClose}>
                  {t(`modals.${modalType}.cancel`)}
                </Button>
                <Button variant="primary" onClick={formik.handleSubmit}>
                  {t(`modals.${modalType}.submit`)}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </>
      );

    default:
      return null;
  }
};

export default renderModalContent;
