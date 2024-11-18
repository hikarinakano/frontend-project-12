import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useSelector } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';

const ChatPage = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    if (channels && isFirstLoad) {
      const generalChannel = channels.find(channel => channel.name === 'general') || channels[0];
      setCurrentChannel(generalChannel);
      setFirstLoad(false);
    }
  }, [channels, isFirstLoad]);

  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
  };

  if (isLoading || !currentChannel) return <div>Loading...</div>;

  return (
    <div className="container h-100  overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end  bg-light flex-column h-100 d-flex">
          <Channels
            currentChannel={currentChannel}
            onChannelSelect={handleChannelSelect}
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
