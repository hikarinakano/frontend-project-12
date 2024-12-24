import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../../routes';
import prepareHeaders from './helpers/prepareHeaders';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: prepareHeaders(headers, { getState }),
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => apiRoutes.messagesPath(),
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
