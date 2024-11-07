import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

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
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: routes.channelsPath(),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: (id, data) => ({
        url: `${routes.channelsPath()}/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channelsPath()}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useEditChannelMutation
} = channelsApi;