import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import Channel from '../Channel';

const PrivatePage = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Set default channel when channels are loaded
  useEffect(() => {
    if (channels && channels.length > 0) {
      const generalChannel = channels.find(channel => channel.name === 'general') || channels[0];
      setSelectedChannel(generalChannel.id);
    }
  }, [channels]);

  if (isLoading || !selectedChannel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid h-100 p-0">
      <div className="row h-100 g-0">
        <div className="col-3 col-md-2 border-end pt-5 bg-light">
          <div className="d-flex flex-column nav nav-pills nav-fill px-2">
            {channels?.map((channel) => (
              <button
                key={channel.id}
                className={`nav-link text-start mb-2 ${
                  selectedChannel === channel.id ? 'active' : ''
                }`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                # {channel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-9 col-md-10 h-100">
          <Channel channelId={selectedChannel} />
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
