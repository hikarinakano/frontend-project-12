import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({
  channel,
  currentChannelId,
  onChannelSelect,
  onShowModal,
}) => {
  const { t } = useTranslation();
  const isActive = channel.id === currentChannelId;
  return (
    <li className="nav-item w-100">
      {!['general', 'random'].includes(channel.name) ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            variant={isActive ? 'secondary' : null}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => onChannelSelect(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            split
            type="button"
            variant={isActive ? 'secondary' : null}
            className="flex-grow-0"
          >
            <span className="visually-hidden">{t('chat.manageChannelLabel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onShowModal('removing', channel.id)}>
              {t('chat.dropdownDelete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onShowModal('renaming', channel.id)}>
              {t('chat.dropdownEdit')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={isActive ? 'secondary' : null}
          className="w-100 rounded-0 text-start"
          onClick={() => onChannelSelect(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
