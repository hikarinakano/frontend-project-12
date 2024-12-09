import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  currentChannelId: null,
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
      state.currentChannelId = payload;
    },
    openModal: (state, { payload: { type, extra = null } }) => {
      state.modal = { isOpen: true, type, extra };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, extra: null };
    },
  },
});

export const { setCurrentChannel, openModal, closeModal } = uiSlice.actions;

export const selectors = {
  selectCurrentChannelId: (state) => state.ui.currentChannelId,
  selectDefaultChannelId: (state) => state.ui.defaultChannelId,
  selectModal: (state) => state.ui.modal,
};

export default uiSlice.reducer; 