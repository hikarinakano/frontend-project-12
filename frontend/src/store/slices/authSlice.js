/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

const getInitialState = () => {
  const stored = localStorage.getItem('userId');
  if (stored) {
    try {
      const { username, token } = JSON.parse(stored);
      return { username, token, loggedIn: true };
    } catch (e) {
      console.error('Failed to parse auth data:', e);
    }
  }
  return { username: null, token: null, loggedIn: false };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      state.loggedIn = true;
      localStorage.setItem('userId', JSON.stringify({ username, token }));
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.loggedIn = false;
      localStorage.removeItem('userId');
    },
  },
});

const selectAuthState = (state) => state.auth;

export const { loginSuccess, logout } = authSlice.actions;
export const selectors = {
  selectIsLoggedIn: createSelector(
    [selectAuthState],
    (auth) => auth.loggedIn,
  ),
  selectUsername: createSelector(
    [selectAuthState],
    (auth) => auth.username,
  ),
};
export default authSlice.reducer;
