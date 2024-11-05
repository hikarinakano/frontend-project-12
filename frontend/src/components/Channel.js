import { useGetMessagesQuery, useAddMessageMutation } from '../store/api/messagesApi';
import { useSelector } from 'react-redux';

const Channel = ({ channelId }) => {
  const { username } = useSelector((state) => state.auth);
  const { data: messages, isLoading, refetch } = useGetMessagesQuery(channelId);
  const [addMessage] = useAddMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;

    try {
      await addMessage({
        body: messageText,
        channelId,
        username,
      }).unwrap();
      e.target.reset();
      refetch();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (isLoading) return <div>Loading messages...</div>;
  const filteredMessages = messages?.filter(message => message.channelId === channelId);

  return (
    <div>
      <div className="messages">
        {filteredMessages?.map((message) => (
          <div key={message.id}>
            <strong>{message.username}:</strong> {message.body}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="message" 
          placeholder="Type a message..."
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Channel;