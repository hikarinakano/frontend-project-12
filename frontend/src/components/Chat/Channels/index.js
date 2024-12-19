import ChannelList from './ChannelList';
import AddChannelButton from './AddChannelButton';

const Channels = ({ channels, currentChannelId }) => (
    <>
      <AddChannelButton />
      <ChannelList channels={channels} currentChannelId={currentChannelId}/>
    </>
  );

export default Channels;
