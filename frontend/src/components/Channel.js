import { useGetMessagesQuery, useAddMessageMutation } from '../store/api/messagesApi';
import { useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useRef, useEffect } from 'react';

const Channel = ({ channelId }) => {
  const { username } = useSelector((state) => state.auth);
  const { data: messages, isLoading } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const channelMessages = messages?.filter(
    (message) => message.channelId === channelId
  ) || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [channelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;

    if (!messageText.trim()) return;

    try {
      await addMessage({
        body: messageText,
        channelId,
        username,
      }).unwrap();

      e.target.reset();
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <span className="text-muted">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto px-5 bg-light">
        <div className="py-4">
          {channelMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${message.username === username ? 'text-end' : ''}`}
            >
              <div
                className={`d-inline-block px-3 py-2 rounded-3 ${message.username === username
                    ? 'bg-primary text-white'
                    : 'bg-white shadow-sm'
                  }`}
              >
                <div className="small text-opacity-75 mb-1">
                  {message.username === username ? 'You' : message.username}
                </div>
                <div>{message.body}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-5 py-3 bg-white border-top">
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              name="message"
              placeholder="Type your message..."
              ref={inputRef}
              required
            />
            <Button type="submit" variant="primary">
              Send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Channel;