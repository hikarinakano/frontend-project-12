import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../../routes';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
        headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => apiRoutes.messagesPath(),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const { socket } = window;

          const handleNewMessage = (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          };

          socket.on('newMessage', handleNewMessage);
          await cacheEntryRemoved;
          socket.off('newMessage', handleNewMessage);
        } catch (e) {
          console.error('Error fetching messages', e.message);
        }
      },
    }),
    addMessage: builder.mutation({
      query: (messageData) => ({
        url: apiRoutes.messagesPath(),
        method: 'POST',
        body: messageData,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
