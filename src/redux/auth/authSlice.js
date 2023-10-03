import { createSlice } from '@reduxjs/toolkit';
import {
  changeAvatar,
  deleteAvatar,
  logInThunk,
  logOutThunk,
  registerThunk,
} from './authOperations';

const defaultUserData = {
  uid: '',
  email: '',
  name: '',
  avatarURL: '',
};

const initialState = {
  email: '',
  name: '',
  password: '',
  isLoggedIn: false,
  user: { ...defaultUserData },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(logInThunk.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(logOutThunk.fulfilled, state => {
        state.isLoggedIn = false;
        state.user = { ...defaultUserData };
      })
      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload;
      })
      .addCase(deleteAvatar.fulfilled, state => {
        state.user.avatarURL = null;
      });
  },
});

export const userReducer = authSlice.reducer;
