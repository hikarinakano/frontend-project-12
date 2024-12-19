import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddIcon from '../../../assets/pictures/add-icon.svg';

const AddChannelButton = ({ handleShowModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('chat.channels')}</b>
      <Button
        variant="group-vertical"
        className="p-0 text-primary"
        onClick={() => handleShowModal('adding')}
      >
        <img src={AddIcon} className="icon-blue" alt="add icon" />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default AddChannelButton;
