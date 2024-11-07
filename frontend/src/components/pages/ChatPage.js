import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import Channels from '../Channels';
import Chat from '../Chat';

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
  }, [channels]);
  if (isLoading || !currentChannel) return <div>Loading...</div>;
  return (
    <div className="container-fluid h-100 p-0">
      <div className="row h-100 g-0">
        <div className="col-3 col-md-2">
          <Channels 
            currentChannel={currentChannel}
            onChannelSelect={setCurrentChannel}
          />
        </div>
        <div className="col-9 col-md-10">
          <Chat currentChannel={currentChannel}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
