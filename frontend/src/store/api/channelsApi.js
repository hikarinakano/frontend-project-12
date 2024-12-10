import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  tagTypes: ['Channels'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (!token) {
        const stored = localStorage.getItem('userId');
        if (stored) {
          const parsedAuth = JSON.parse(stored);
          headers.set('Authorization', `Bearer ${parsedAuth.token}`);
        }
      } else {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const { socket } = window;
          const handleNewChannel = (channel) => {
            updateCachedData((draft) => {
              if (!draft.find((ch) => ch.id === channel.id)) {
                draft.push(channel);
              }
            });
          };

          const handleRemoveChannel = ({ id }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((channel) => channel.id === id);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            });
          };

          const handleRenameChannel = ({ id, name }) => {
            updateCachedData((draft) => {
              const channel = draft.find((c) => c.id === id);
              if (channel) {
                channel.name = name;
              }
            });
          };

          socket.on('newChannel', handleNewChannel);
          socket.on('removeChannel', handleRemoveChannel);
          socket.on('renameChannel', handleRenameChannel);

          await cacheEntryRemoved;
          socket.off('newChannel', handleNewChannel);
          socket.off('removeChannel', handleRemoveChannel);
          socket.off('renameChannel', handleRenameChannel);
        } catch (e) {
          console.error('Error handling channel socket events:', e.message);
        }
      },
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: apiRoutes.channelsPath(),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data: newChannel } = await queryFulfilled;
          window.socket.emit('newChannel', { ...newChannel, username: arg.username });
        } catch (error) {
          console.error('Failed to add channel:', error);
        }
      },
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `${apiRoutes.channelsPath()}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          window.socket.emit('removeChannel', { id });
        } catch (error) {
          console.error('Failed to delete channel:', error);
        }
      },
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `${apiRoutes.channelsPath()}/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted({ id, name }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          window.socket.emit('renameChannel', { id, name });
        } catch (error) {
          console.error('Failed to rename channel:', error);
        }
      },
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useEditChannelMutation,
} = channelsApi;
