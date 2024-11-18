import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';
import socket from '../../services/socket';

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
      query: () => routes.channelsPath(),
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, }
      ) {
        try {
          await cacheDataLoaded;

          socket.on('newChannel', (channel) => {
            updateCachedData((draft) => {
              if (!draft.find((ch) => ch.id === channel.id)) {
                draft.push(channel);
              }
            });
          });

          socket.on('removeChannel', ({ id }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((channel) => channel.id === id);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            });
          });

          socket.on('renameChannel', ({ id, name }) => {
            updateCachedData((draft) => {
              const channel = draft.find((c) => c.id === id);
              if (channel) {
                channel.name = name;
              }
            });
          });

          await cacheEntryRemoved;
          socket.off('newChannel');
          socket.off('removeChannel');
          socket.off('renameChannel');
        } catch (e) {
          console.error('Error handling channel socket events:', e.message);
        }
      },
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: routes.channelsPath(),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data: newChannel } = await queryFulfilled;
          socket.emit('newChannel', { ...newChannel, username: arg.username });
        } catch (error) {
          console.error('Failed to add channel:', error);
        }
      },
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channelsPath()}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          socket.emit('removeChannel', { id });
        } catch (error) {
          console.error('Failed to delete channel:', error);
        }
      },
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `${routes.channelsPath()}/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
      async onQueryStarted({ id, name }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          socket.emit('renameChannel', { id, name });
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
