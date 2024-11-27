import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import usePageTranslation from '../../hooks/usePageTranslation';

const Channel = ({
  channel,
  currentChannel,
  onChannelSelect,
  onChannelDelete,
  onChannelEdit,
}) => {
  const translation = usePageTranslation('chat');
  const isActive = channel.id === currentChannel.id;

  return (
    <li className="nav-item w-100">
      {!['general', 'random'].includes(channel.name) ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            variant={isActive ? 'secondary' : null}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => onChannelSelect(channel)}
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
            <span className="visually-hidden">{translation('manageChannelLabel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item role="button" onClick={() => onChannelDelete(channel.id)}>
              {translation('dropdownDelete')}
            </Dropdown.Item>
            <Dropdown.Item role="button" onClick={() => onChannelEdit(channel.id)}>
              {translation('dropdownEdit')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={isActive ? 'secondary' : null}
          className="w-100 rounded-0 text-start"
          onClick={() => onChannelSelect(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
