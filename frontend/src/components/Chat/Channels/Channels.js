import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../../../store/api/channelsApi';
import { setCurrentChannel, openModal, uiSelectors } from '../../../store/slices/uiSlice';
import Channel from './Channel';
import AddIcon from '../../../assets/pictures/add-icon.svg';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);
  const { t } = useTranslation();

  const handleShowModal = (type, extra = null) => {
    dispatch(openModal({ type, extra }));
  };

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => handleShowModal('adding')}
        >
          <img src={AddIcon} className="icon-blue" alt="add icon" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannelId={currentChannelId}
            onChannelSelect={handleChannelSelect}
            onShowModal={handleShowModal}
          />
        ))}
      </ul>
    </>
  );
};

export default Channels;
