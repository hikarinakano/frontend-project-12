import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import Channels from './Channels';
import Chat from './Chat';

const ChatPage = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (channels && isFirstLoad) {
      const generalChannel = channels.find(channel => channel.name === 'general') || channels[0];
      setCurrentChannel(generalChannel);
      setFirstLoad(false);
    }
  }, [channels, isFirstLoad]);

  if (isLoading || !currentChannel) return <div>Loading...</div>;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels
            currentChannel={currentChannel}
            onChannelSelect={setCurrentChannel}
          />
        </div>
        <div className="col-8 col-md-10 h-100">
          <Chat currentChannel={currentChannel} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
