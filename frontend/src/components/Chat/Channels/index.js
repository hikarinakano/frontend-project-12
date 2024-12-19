import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, openModal, uiSelectors } from '../../../store/slices/uiSlice';
import ChannelList from './ChannelsList';
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

  return (
    <>
      <AddChannelButton handleShowModal={handleShowModal} />
      <ChannelList
        channels={channels}
        currentChannelId={currentChannelId}
        onShowModal={handleShowModal}
        onChannelSelect={handleChannelSelect}
      />
    </>
  );
};

export default Channels;
