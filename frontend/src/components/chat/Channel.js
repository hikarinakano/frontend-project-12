import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import usePageTranslation from '../../hooks/usePageTranslation';

const Channel = ({
  channel,
  currentChannelId,
  onChannelSelect,
  onShowModal,
}) => {
  const translation = usePageTranslation('chat');
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
            <span className="visually-hidden">{translation('manageChannelLabel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onShowModal('removing', channel.id)}>
              {translation('dropdownDelete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onShowModal('renaming', channel.id)}>
              {translation('dropdownEdit')}
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
