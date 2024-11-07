import { useRef, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../store/api/messagesApi';

const Chat = ({ currentChannel }) => {
  const { id, name } = currentChannel;
  console.log('current channel is',currentChannel)
  const { username } = useSelector((state) => state.auth);
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const channelMessages = messages.filter(
    (message) => message.channelId === id
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;

    if (!messageText.trim()) return;

    try {
      await addMessage({
        body: messageText,
        channelId: id,
        username,
      });
      e.target.reset();
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>#{name}</b>
        </p>
        <span className="text-muted">
          {channelMessages.length} messages
        </span>
      </div>

      <div className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${message.username === username ? 'text-end' : ''}`}
          >
            <div
              className={`d-inline-block px-3 py-2 rounded-3 ${
                message.username === username
                  ? 'bg-primary text-white'
                  : 'bg-light'
              }`}
            >
              <div className="small mb-1">
                {message.username === username ? 'You' : message.username}
              </div>
              <div>{message.body}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto px-5 py-3">
        <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              placeholder="Enter your message..."
              name="message"
              aria-label="New message"
              ref={inputRef}
              required
            />
            <Button type="submit" variant="group-vertical" className="border-0">
              ↵
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Chat; 