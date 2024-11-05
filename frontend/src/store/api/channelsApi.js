import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // Try getting token from Redux state first
      const { token } = getState().auth;
      
      if (!token) {
        // If no token in Redux, try localStorage
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
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;