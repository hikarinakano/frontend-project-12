import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

export const messagesApi = createApi({
  reducerPath: 'messages',
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
    getMessages: builder.query({
      query: () => routes.messagesPath(),
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
        url: routes.messagesPath(),
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
