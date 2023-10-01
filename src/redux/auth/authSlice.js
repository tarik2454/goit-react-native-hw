import { createSlice } from '@reduxjs/toolkit';
import { logInThunk, registerThunk } from './authOperations';

const defaultUserData = {
  uid: '',
  email: '',
  name: '',
  avatarURL: '',
};

const initialState = {
  user: null,
  isLoggedIn: false,
  error: '',
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
      .addCase(registerThunk.pending, (state, action) => {})
      .addCase(registerThunk.rejected, (state, action) => {})
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(logOut.fulfilled, state => {
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
