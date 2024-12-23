import Header from './Header';
import MessageForm from './Form';
import MessageList from './MessageList';

const Messages = ({ currentChannel, messages = [] }) => {
  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannel.id,
  );
  return (
    <div className="d-flex flex-column h-100">
      <Header
        channelName={currentChannel?.name}
        messagesCount={channelMessages.length}
      />
      <MessageList channelMessages={channelMessages} />
      <MessageForm />
    </div>
  );
};

export default Messages;
