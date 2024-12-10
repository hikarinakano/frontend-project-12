import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChannelButton from './ChannelButton';

const Channel = ({
  channel,
  currentChannelId,
  onChannelSelect,
  onShowModal,
}) => {
  const { t } = useTranslation();
  const isActive = channel.id === currentChannelId;
  const isDefaultChannel = ['general', 'random'].includes(channel.name);

  const channelButton = (
    <ChannelButton 
      channel={channel} 
      isActive={isActive} 
      onChannelSelect={onChannelSelect}
    />
  );

  return (
    <li className="nav-item w-100">
      {isDefaultChannel ? channelButton : (
        <Dropdown as={ButtonGroup} className="d-flex">
          {channelButton}
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
      )}
    </li>
  );
};

export default Channel;
