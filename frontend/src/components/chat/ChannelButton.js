import { Button } from 'react-bootstrap';

const ChannelButton = ({ channel, isActive, onChannelSelect }) => (
  <Button
    type="button"
    variant={isActive ? 'secondary' : null}
    className="w-100 rounded-0 text-start text-truncate"
    onClick={() => onChannelSelect(channel.id)}
  >
    <span className="me-1">#</span>
    {channel.name}
  </Button>
);

export default ChannelButton;
