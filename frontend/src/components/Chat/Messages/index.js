import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../../store/api/messagesApi';
import { useGetChannelsQuery } from '../../../store/api/channelsApi';
import { uiSelectors } from '../../../store/slices/uiSlice';
import Header from './Header';
import MessageForm from './Form';
import MessageList from './MessageList';

const Chat = () => {
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();
  
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  return (
    <div className="d-flex flex-column h-100">
      <Header channelName={currentChannel.name} messagesCount={channelMessages.length} />
      <MessageList channelMessages={channelMessages}/>
      <MessageForm currentChannelId={currentChannelId} />
    </div>
  );
};

export default Chat;
