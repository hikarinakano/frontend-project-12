import { useRef, useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../../store/api/messagesApi';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import Channels from './Channels';

const Chat = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (channels.length > 0 && !currentChannel) {
      const generalChannel = channels.find((channel) => channel.name === 'general');
      if (generalChannel) {
        setCurrentChannel(generalChannel);
      }
    }
  }, [channels, currentChannel]);

  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
  };

  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannel.id
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChannel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;

    if (!messageText.trim()) return;

    try {
      const cleanedMessage = filter.clean(messageText);
      await addMessage({
        body: cleanedMessage,
        channelId: currentChannel.id,
        username,
      });
      e.target.reset();
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels
            currentChannel={currentChannel}
            onChannelSelect={handleChannelSelect}
          />
        </div>
        <div className="col-8 col-md-10 h-100 d-flex flex-column">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># {currentChannel?.name}</b>
            </p>
            <span className="text-muted">
            {t('chat.messages', { count: channelMessages.length })}
            </span>
          </div>

          <div className="chat-messages px-5 overflow-auto flex-grow-1">
            {channelMessages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 ${message.username === username ? 'text-end' : ''}`}
              >
                <div className={`message-bubble ${message.username === username ? 'bg-primary text-white' : 'bg-light'
                  }`}>
                  <div className="small mb-1 text-bold">
                    {message.username}
                  </div>
                  {message.body}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-auto px-5 py-3">
            <Form
              onSubmit={handleSubmit}
              className="py-1 border rounded-2"
            >
              <InputGroup>
                <Form.Control
                  name="message"
                  aria-label={t('chat.newMessageLabel')}
                  placeholder={t('chat.messageInput')}
                  className="border-0 p-0 ps-2"
                  ref={inputRef}
                />
                <Button type="submit" variant="group-vertical" className="border-0">
                  ↵
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 