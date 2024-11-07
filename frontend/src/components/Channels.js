import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useGetChannelsQuery, useDeleteChannelMutation } from '../store/api/channelsApi';
import AddChannelModal from './modals/AddChannelModal';

const Channels = ({ currentChannel, onChannelSelect }) => {
  const { data: channels = [] } = useGetChannelsQuery();
  const [deleteChannel] = useDeleteChannelMutation();
  const [showAddModal, setShowAddModal] = useState(false);
  const { id } = currentChannel;
  const handleDelete = async (channelId) => {
    try {
      await deleteChannel(channelId).unwrap();
      if (channelId === id) {
        const generalChannel = channels.find(c => c.name === 'general');
        if (generalChannel) {
          onChannelSelect(generalChannel);
        }
      }
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };
  // handleEdit also
  const renderChannel = (channel) => {
    const isDefault = ['general', 'random'].includes(channel.name);
    const channelName = `# ${channel.name}`;

    return (
      <li key={channel.id} className="nav-item d-flex mb-2">
        <Button
          variant={currentChannel === channel.id ? 'primary' : 'light'}
          className="text-start w-100 text-truncate"
          onClick={() => onChannelSelect(channel)}
        >
          {channelName}
        </Button>

        {!isDefault && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id={`channel-${channel.id}-dropdown`}>
              <span className="visually-hidden">Channel menu</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDelete(channel.id)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="channels-container d-flex flex-column h-100">
        <div className="channels-header d-flex justify-content-between align-items-center p-3">
          <span className="h6 mb-0">Channels</span>
          <Button 
            variant="link" 
            className="p-0 text-primary" 
            onClick={() => setShowAddModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </Button>
        </div>

        <ul className="nav flex-column nav-pills nav-fill px-2">
          {Array.isArray(channels) && channels.map(renderChannel)}
        </ul>
      </div>

      <AddChannelModal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        onChannelAdd={(newChannel) => {
          if (newChannel?.id) {
            onChannelSelect(newChannel.id);
          }
        }}
      />
    </>
  );
};

export default Channels;