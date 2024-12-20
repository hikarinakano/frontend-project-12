import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useGetMessagesQuery } from '../../store/api/messagesApi';
import { setCurrentChannel, uiSelectors } from '../../store/slices/uiSlice';
import ChannelList from '../Chat/Channels/ChannelList';
import Messages from '../Chat/Messages/index';
import ChatSkeleton from '../Chat/Skeletons/ChatSkeleton';
import ChannelsSkeleton from '../Chat/Skeletons/ChannelsSkeleton';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { data: channels = [], isLoading: isChannelsLoading } = useGetChannelsQuery();
  const { data: messages = [], isLoading: isMessagesLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);

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
          <ChannelList channels={channels} currentChannelId={currentChannelId} />
        </div>
        <div className="col p-0 h-100">
          <Messages
            currentChannel={currentChannel}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;