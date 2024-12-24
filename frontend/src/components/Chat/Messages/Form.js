import { useRef, useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../../../store/api/messagesApi';
import SendIcon from '../../../assets/pictures/send-message-icon.svg';
import { uiSelectors } from '../../../store/slices/uiSlice';

const MessageForm = () => {
  const { username } = useSelector((state) => state.auth);
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const [addMessage] = useAddMessageMutation();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    try {
      setIsSending(true);
      const cleanedMessage = filter.clean(messageText);
      await addMessage({
        body: cleanedMessage,
        channelId: currentChannelId,
        username,
      });
      setMessageText('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
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
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isSending}
          />
          <Button
            type="submit"
            variant="group-vertical"
            disabled={!messageText.trim() || isSending}
          >
            <img src={SendIcon} alt="send a message button" />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
