import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;