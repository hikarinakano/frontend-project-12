import { useSelector } from 'react-redux';
import { uiSelectors } from '../../../store/slices/uiSlice';
import Header from './Header';
import MessageForm from './Form';
import MessageList from './MessageList';

const Messages = ({ currentChannel, messages = [] }) => {
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId); 
  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );

  return (
    <div className="d-flex flex-column h-100">
      <Header 
        channelName={currentChannel?.name} 
        messagesCount={channelMessages.length} 
      />
      <MessageList channelMessages={channelMessages} />
      <MessageForm currentChannelId={currentChannelId} />
    </div>
  );
};

export default Messages;
