import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useState } from 'react';
import Channel from '../Channel';

const PrivatePage = () => {
  const { data: channels, isLoading, error } = useGetChannelsQuery();
  const [selectedChannel, setSelectedChannel] = useState('general');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
  }
  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels?.map((channel) => (
          <li key={channel.id} onClick={() => handleChannelSelect(channel.id)}>
            {channel.name}
          </li>
        ))}
      </ul>
      <Channel channelId={selectedChannel} />
    </div>
  );
};

export default PrivatePage;
