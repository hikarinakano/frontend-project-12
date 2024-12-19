import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, openModal, uiSelectors } from '../../../store/slices/uiSlice';
import Channel from './Channel';
import AddChannelButton from './AddChannelButton';

const Channels = ({ channels }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(uiSelectors.selectCurrentChannelId);

  const handleShowModal = (type, extra = null) => {
    dispatch(openModal({ type, extra }));
  };

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const channelList = channels.map((channel) => (
    <Channel
      key={channel.id}
      channel={channel}
      currentChannelId={currentChannelId}
      onChannelSelect={handleChannelSelect}
      onShowModal={handleShowModal}
    />
  ))


  return (
    <>
      <AddChannelButton handleShowModal={handleShowModal} />
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelList}
      </ul>
    </>
  );
};

export default Channels;
