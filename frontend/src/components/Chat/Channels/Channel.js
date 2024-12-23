import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal, setCurrentChannel } from '../../../store/slices/uiSlice';

const Channel = ({ channel, isCurrent }) => {
  const dispatch = useDispatch();
  const { id, name, removable } = channel;
  const { t } = useTranslation();

  const handleShowModal = (type, extra = null) => {
    dispatch(openModal({ type, extra }));
  };

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const channelButton = (
    <Button
      type="button"
      variant={isCurrent ? 'secondary' : null}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => handleChannelSelect(id)}
      role="button"
      aria-label={name}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  if (!removable) {
    return channelButton;
  }

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      {channelButton}
      <Dropdown.Toggle
        split
        type="button"
        variant={isCurrent ? 'secondary' : null}
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('chat.manageChannelLabel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleShowModal('removing', id)}>
          {t('chat.dropdownDelete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleShowModal('renaming', id)}>
          {t('chat.dropdownEdit')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
