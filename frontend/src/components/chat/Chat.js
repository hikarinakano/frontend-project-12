import { useRef, useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useGetMessagesQuery, useAddMessageMutation } from '../../store/api/messagesApi';

const Chat = ({ currentChannel }) => {
  const { username } = useSelector((state) => state.auth);
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');

  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id,
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChannel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    try {
      const cleanedMessage = filter.clean(messageText);
      await addMessage({
        body: cleanedMessage,
        channelId: currentChannel.id,
        username,
      });
      setMessageText('');
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            # {currentChannel?.name}
          </b>
        </p>
        <span className="text-muted">
          {t('chat.messages', { count: channelMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {': '}
            {message.body}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="py-1 border rounded-2"
        >
          <InputGroup hasValidation>
            <Form.Control
              name="body"
              aria-label={t('chat.newMessageLabel')}
              placeholder={t('chat.messageInput')}
              className="border-0 p-0 ps-2"
              ref={inputRef}
              value={messageText}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="group-vertical"
              disabled={!messageText.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
              <span className="visually-hidden">{t('chat.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
