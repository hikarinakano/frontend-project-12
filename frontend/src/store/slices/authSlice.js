/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearAuthInfo: (state) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export default authSlice.reducer;
