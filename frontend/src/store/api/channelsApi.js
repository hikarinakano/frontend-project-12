import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (!token) {
        throw new Error('No auth token available');
      }
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
      transformErrorResponse: (response) => {
        console.error('Channels API Error:', response);
        return response;
      },
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: apiRoutes.channelsPath(),
        method: 'POST',
        body: data,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `${apiRoutes.channelsPath()}/${id}`,
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `${apiRoutes.channelsPath()}/${id}`,
        method: 'PATCH',
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useEditChannelMutation,
} = channelsApi;
