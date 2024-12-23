/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

const getInitialState = () => {
  const stored = localStorage.getItem('userId');
  if (stored) {
    try {
      const { username, token } = JSON.parse(stored);
      return {
        username,
        token,
        isLoggedIn: true,
        isLoading: false,
      };
    } catch (e) {
      console.error('Failed to parse auth data:', e);
      localStorage.removeItem('userId');
    }
  }
  return {
    username: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      state.isLoggedIn = true;
      state.isLoading = false;
      localStorage.setItem('userId', JSON.stringify({ username, token }));
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      localStorage.removeItem('userId');
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const selectAuthState = (state) => state.auth;

export const { login, logout, setAuthLoading } = authSlice.actions;

export const selectors = {
  selectIsLoggedIn: createSelector(
    [selectAuthState],
    (auth) => auth.isLoggedIn,
  ),
  selectUsername: createSelector(
    [selectAuthState],
    (auth) => auth.username,
  ),
  selectIsAuthLoading: createSelector(
    [selectAuthState],
    (auth) => auth.isLoading,
  ),
};

export default authSlice.reducer;
