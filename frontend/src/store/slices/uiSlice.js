/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: {
    currentChannelId: null,
    defaultChannelId: DEFAULT_CHANNEL_ID,
  },
  modal: {
    isOpen: false,
    type: null,
    extra: null,
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
      state.channels.currentChannelId = defaultId.toString();
    },
    openModal: (state, { payload: { type, extra = null } }) => {
      state.modal = { isOpen: true, type, extra };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, extra: null };
    },
  },
});

export const {
  setCurrentChannel,
  setDefaultChannel,
  openModal,
  closeModal,
} = uiSlice.actions;

export const selectors = {
  selectCurrentChannelId: (state) => state.ui.channels.currentChannelId,
  selectDefaultChannelId: (state) => state.ui.channels.defaultChannelId,
  selectModal: (state) => state.ui.modal,
};

export default uiSlice.reducer;
