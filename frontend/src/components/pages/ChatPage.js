import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useGetMessagesQuery } from '../../store/api/messagesApi';
import { setCurrentChannel, selectors } from '../../store/slices/uiSlice';
import Channels from '../chat/Channels';
import Chat from '../chat/Chat';
import ChatSkeleton from '../chat/skeletons/ChatSkeleton';
import ChannelsSkeleton from '../chat/skeletons/ChannelsSkeleton';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { data: channels, isLoading: isChannelsLoading } = useGetChannelsQuery();
  const { isLoading: isMessagesLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectors.selectCurrentChannelId);

  useEffect(() => {
    if (channels?.length > 0 && !currentChannelId) {
      const generalChannel = channels.find((channel) => channel.name === 'general');
      if (generalChannel) {
        dispatch(setCurrentChannel(generalChannel.id));
      }
    }
  }, [channels, currentChannelId, dispatch]);

  const currentChannel = channels?.find((channel) => channel.id === currentChannelId);
  const isLoading = isChannelsLoading || isMessagesLoading;

  if (isLoading) {
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
            onChannelSelect={(channel) => dispatch(setCurrentChannel(channel.id))}
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
