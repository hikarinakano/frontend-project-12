import { useGetChannelsQuery } from '../../store/api/channelsApi';

const PrivatePage = () => {
  const { data: channels, isLoading, error } = useGetChannelsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Channels</h2>
      {channels?.map((channel) => (
        <div key={channel.id}>{channel.name}</div>
      ))}
    </div>
  );
};

export default PrivatePage;
