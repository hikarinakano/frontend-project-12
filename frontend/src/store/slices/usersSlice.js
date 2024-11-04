import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: '',
  initialState: {
    data: [],
    isLoading: false,
    error: null
  }
})