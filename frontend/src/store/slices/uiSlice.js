/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = '1';

const initialState = {
  channels: {
    currentChannelId: DEFAULT_CHANNEL_ID,
    defaultChannelId: DEFAULT_CHANNEL_ID,
  },
  modal: {
    isOpen: false,
    type: null,
    extra: null,
  },
  errors: {
    type: null,
    isAuthError: false,
    isSignupError: false,
    isNetworkError: false,
    status: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.channels.currentChannelId = payload;
    },
    setDefaultChannel: (state) => {
      const defaultId = state.channels.defaultChannelId;
      state.channels.currentChannelId = defaultId;
    },
    openModal: (state, { payload: { type, extra = null } }) => {
      state.modal = { isOpen: true, type, extra };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, extra: null };
    },
    setAuthError: (state, { payload: { type, code } }) => {
      state.errors.type = type;
      state.errors.isAuthError = true;
      state.errors.status = code;
    },
    setSignupError: (state, { payload: { type, code } }) => {
      state.errors.type = type;
      state.errors.status = code;
      state.errors.isSignupError = true;
    },
    setNetworkError: (state, { payload: { type, code } }) => {
      state.errors.type = type;
      state.errors.status = code;
      state.errors.isNetworkError = true;
    },
    cleanError: (state) => {
      state.errors.type = null;
      state.errors.isAuthError = false;
      state.errors.isSignupError = false;
      state.errors.isNetworkError = false;
      state.errors.status = null;
    },
  },
});

export const {
  setCurrentChannel,
  setDefaultChannel,
  setAuthError,
  setSignupError,
  setNetworkError,
  cleanError,
  openModal,
  closeModal,
} = uiSlice.actions;

export const uiSelectors = {
  selectCurrentChannelId: (state) => state.ui.channels.currentChannelId,
  selectDefaultChannelId: (state) => state.ui.channels.defaultChannelId,
  selectModal: (state) => state.ui.modal,
  selectIsAuthError: (state) => state.ui.errors.isAuthError,
  selectAuthError: (state) => state.ui.errors.type,
  selectIsSignupError: (state) => state.ui.errors.isSignupError,
};

export default uiSlice.reducer;
