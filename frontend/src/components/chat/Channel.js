import { Button, Dropdown } from 'react-bootstrap';
import { usePageTranslation } from '../../hooks/usePageTranslation';

const Channel = ({ channel, currentChannel, onChannelSelect, onChannelDelete, onChannelEdit }) => {
  const isDefault = ['general', 'random'].includes(channel.name);
  const translation = usePageTranslation('chat')
  const channelName = `# ${channel.name}`;
  const { id } = currentChannel;
  return (
    <li key={channel.id} className="nav-item d-flex mb-2">
      <Button
        variant={id === channel.id ? 'primary' : 'light'}
        className="text-start w-100 text-truncate"
        onClick={() => onChannelSelect(channel)}
      >
        {channelName}
      </Button>

      {!isDefault && (
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id={`channel-${channel.id}-dropdown`}>
            <span className="visually-hidden">{translation('manageChannelLabel')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onChannelDelete(channel.id)}>
              {translation('dropdownDelete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onChannelEdit(channel.id)}>
              {translation('dropdownEdit')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </li>
  );
}

export default Channel;