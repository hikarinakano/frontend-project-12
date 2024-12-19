import ChannelButton from "./ChannelButton";
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const RemovableCHannelButton = ({ channel, isActive, onChannelSelect, onShowModal }) => {
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <ChannelButton
        channel={channel}
        isActive={isActive}
        onChannelSelect={onChannelSelect}
      />
      <Dropdown.Toggle
        split
        type="button"
        variant={isActive ? 'secondary' : null}
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('chat.manageChannelLabel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onShowModal('removing', channel.id)}>
          {t('chat.dropdownDelete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onShowModal('renaming', channel.id)}>
          {t('chat.dropdownEdit')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableCHannelButton;
