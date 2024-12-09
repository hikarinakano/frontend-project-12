import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import Channels from '../chat/Channels';
import Chat from '../chat/Chat';
import ChatSkeleton from '../chat/skeletons/ChatSkeleton';
import ChannelsSkeleton from '../chat/skeletons/ChannelsSkeleton';

const ChatPage = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (channels && isFirstLoad) {
      const generalChannel = channels.find((channel) => channel.name === 'general') || channels[0];
      setCurrentChannel(generalChannel);
      setFirstLoad(false);
    }
  }, [channels, isFirstLoad]);

  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
  };

  if (isLoading || !currentChannel) {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsSkeleton />
          </div>
          <div className="col p-0 h-100">
            <ChatSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels
            currentChannel={currentChannel}
            onChannelSelect={handleChannelSelect}
          />
        </div>
        <div className="col p-0 h-100">
          <Chat currentChannel={currentChannel} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
