import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slices/authSlice';
import { channelsApi } from "./api/channelsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware),
});


export default store;