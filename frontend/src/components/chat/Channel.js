import { Button, Dropdown } from 'react-bootstrap';
import { usePageTranslation } from '../../hooks/usePageTranslation';

const Channel = ({ channel, currentChannel, onChannelSelect, onChannelDelete, onChannelEdit }) => {
  const isDefault = ['general', 'random'].includes(channel.name);
  const translation = usePageTranslation('chat');
  const channelName = `# ${channel.name}`;
  const { id } = currentChannel;

  return (
    <li key={channel.id} className="nav-item w-100">
      <div className="d-flex dropdown">
        <Button
          variant={id === channel.id ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => onChannelSelect(channel)}
        >
          {channelName}
        </Button>

        {!isDefault && (
          <Dropdown align="end">
            <Dropdown.Toggle 
              split
              variant={id === channel.id ? 'secondary' : 'light'}
              className="flex-grow-0"
            >
              <span className="visually-hidden">{translation('manageChannelLabel')}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onChannelEdit(channel.id)}>
                {translation('dropdownEdit')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChannelDelete(channel.id)}>
                {translation('dropdownDelete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </li>
  );
};

export default Channel;