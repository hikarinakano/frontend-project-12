import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useGetMessagesQuery } from '../../store/api/messagesApi';
import { setCurrentChannel, selectors } from '../../store/slices/uiSlice';
import Channels from '../chat/Channels';
import Chat from '../chat/Chat';
import ChatSkeleton from '../chat/skeletons/ChatSkeleton';
import ChannelsSkeleton from '../chat/skeletons/ChannelsSkeleton';
import Wrapper from '../chat/ChatWrapper';

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
      <Wrapper
        channels={<ChannelsSkeleton />}
        chat={<ChatSkeleton />}
      />
    );
  }
  return (
    <Wrapper
      channels={(
        <Channels
          currentChannel={currentChannel}
          onChannelSelect={(channel) => dispatch(setCurrentChannel(channel.id))}
        />
      )}
      chat={<Chat currentChannel={currentChannel} />}
    />
  );
};

export default ChatPage;
