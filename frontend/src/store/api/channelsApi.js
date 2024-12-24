import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from '../../routes';
import prepareHeaders from '../helpers/prepareHeaders';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
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
