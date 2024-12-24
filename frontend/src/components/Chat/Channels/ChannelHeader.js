import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/slices/uiSlice';
import AddIcon from '../../../assets/pictures/add-icon.svg';

const ChannelHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleShowModal = (type, extra = null) => {
    dispatch(openModal({ type, extra }));
  };

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

export default ChannelHeader;
