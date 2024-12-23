import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useGetMessagesQuery } from '../../store/api/messagesApi';
import { setDefaultChannel, uiSelectors } from '../../store/slices/uiSlice';
import Channels from '../Chat/Channels/index';
import Messages from '../Chat/Messages/index';
import ChatSkeleton from '../Chat/Skeletons/ChatSkeleton';
import ChannelsSkeleton from '../Chat/Skeletons/ChannelsSkeleton';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { data: channels, isLoading: isChannelsLoading } = useGetChannelsQuery();
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const currentChannel = channels?.find((channel) => channel.id === currentChannelId);
  const isLoading = isChannelsLoading || isMessagesLoading;
  useEffect(() => {
    if (channels?.length > 0 && !currentChannelId) {
      dispatch(setDefaultChannel());
    }
  }, [channels, currentChannelId, dispatch]);

  console.log('is loading', isLoading);
  console.log('current channel',currentChannel);
  console.log('channels', channels)
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
          <Channels channels={channels} currentChannelId={currentChannelId} />
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