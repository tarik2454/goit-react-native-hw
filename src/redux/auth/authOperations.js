import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../config';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    const login = credentials.login;
    const email = credentials.email;
    const password = credentials.password;
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      return {
        login: login,
        email: userData.user.email,
        userId: userData.user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInThunk = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const {
        user: { uid, displayName, photoURL },
      } = await signInWithEmailAndPassword(auth, email, password);

      return {
        uid,
        email,
        name: displayName,
        avatarURL: photoURL,
      };
    } catch (error) {
      Alert.alert('Ви ввели неправильну адресу електронної пошти або пароль');
      return rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      // alert(`LogoutError, ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);
