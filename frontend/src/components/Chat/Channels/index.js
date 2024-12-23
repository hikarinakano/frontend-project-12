import Channel from './Channel';
import AddChannelButton from './AddChannelButton';

const ChannelList = ({
  channels,
  currentChannelId,
}) => (
  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map((channel) => (
      <li key={channel.id} className="nav-item w-100">
        <Channel
          channel={channel}
          isCurrent={channel.id === currentChannelId}
        />
      </li>
    ))}
  </ul>
);

const Channels = ({ channels, currentChannelId }) => (
  <>
    <AddChannelButton />
    <ChannelList channels={channels} currentChannelId={currentChannelId} />
  </>
);

export default Channels;
