import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/channelsApi';
import AddChannelModal from '../modals/AddChannelModal';
import DeleteChannelModal from '../modals/DeleteChannelModal';
import EditChannelModal from '../modals/EditChannelModal';
import Channel from './Channel';
import usePageTranslation from '../../hooks/usePageTranslation';

const Channels = ({ currentChannel, onChannelSelect }) => {
  const { username } = useSelector((state) => state.auth);
  const { data: channels = [] } = useGetChannelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const [channelToEdit, setChannelToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const t = usePageTranslation('chat');

  const handleChannelDelete = (deletedChannelId) => {
    if (deletedChannelId === currentChannel.id) {
      const generalChannel = channels.find((c) => c.name === 'general');
      if (generalChannel) {
        onChannelSelect(generalChannel);
      }
    }
  };
  const handleShowDeleteModal = (channelId) => {
    setChannelToDelete(channelId);
    setShowDeleteModal(true);
  };
  const handleButtonClick = (e) => {
    e.currentTarget.blur();
    setShowAddModal(true);
  };

  const handleAddChannel = (newChannel) => {
    if (username === newChannel.username) {
      onChannelSelect(newChannel);
    }
    setShowAddModal(false);
  };

  const handleChannelEdit = (channelId) => {
    setChannelToEdit(channelId);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannel={currentChannel}
            onChannelSelect={onChannelSelect}
            onChannelDelete={handleShowDeleteModal}
            onChannelEdit={handleChannelEdit}
          />
        ))}
      </ul>

      <AddChannelModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onChannelAdd={handleAddChannel}
      />
      <DeleteChannelModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        channelId={channelToDelete}
        onChannelDelete={handleChannelDelete}
      />
      <EditChannelModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        channelId={channelToEdit}
        onChannelEdit={handleChannelEdit}
      />
    </>
  );
};

export default Channels;
