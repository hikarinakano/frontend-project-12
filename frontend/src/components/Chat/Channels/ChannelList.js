import Channel from './Channel';

const ChannelList = ({ channels, currentChannel }) => (
  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map((channel) => {
      const isCurrent = channel.id === currentChannel.id;
      return (
        <li key={channel.id} className="nav-item w-100">
          <Channel channel={channel} isCurrent={isCurrent} />
        </li>
      )
    })}
  </ul>
);

export default ChannelList;
