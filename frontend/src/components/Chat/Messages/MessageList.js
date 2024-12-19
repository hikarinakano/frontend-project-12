const MessageList = ({ channelMessages }) => 
  (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
    </div>
  );

export default MessageList;
