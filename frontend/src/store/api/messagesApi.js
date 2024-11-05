// i need to fetch all the messages for this user
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
      query: (channelId) => ({
        url: routes.messagesPath(),
        params: { channelId }  // Add channelId as a query parameter
      }),
    }),
    addMessage: builder.mutation({
      query: (messageData) => ({
        url: routes.messagesPath(),
        method: 'POST',
        body: messageData,  // { body: 'message text', channelId: 1, username: 'user' }
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;