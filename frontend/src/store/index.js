import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { channelsApi } from './api/channelsApi';
import { messagesApi } from './api/messagesApi';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    ui: uiReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
});

export default store;
