import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import { channelsApi } from './api/channelsApi';
import { messagesApi } from './api/messagesApi';
import { authApi } from './api/authApi';


const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    ui: uiReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware)
      .concat(authApi.middleware),
});

export default store;
