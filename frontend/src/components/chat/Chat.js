import { useRef, useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useGetMessagesQuery, useAddMessageMutation } from '../../store/api/messagesApi';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { uiSelectors } from '../../store/slices/uiSlice';
import { ReactComponent as ChatSendBtn } from '../../assets/svg/send-message-button.svg';

const Chat = () => {
  const { username } = useSelector((state) => state.auth);
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');

  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
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
        channelId: currentChannelId,
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
            {`# ${currentChannel?.name}`}
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
              <ChatSendBtn />
              <span className="visually-hidden">{t('chat.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
