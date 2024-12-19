import ChannelList from './ChannelsList';
import AddChannelButton from './AddChannelButton';

const Channels = ({ channels, currentChannel }) => (
    <>
      <AddChannelButton />
      <ChannelList channels={channels} currentChannel={currentChannel}/>
    </>
  );

export default Channels;
