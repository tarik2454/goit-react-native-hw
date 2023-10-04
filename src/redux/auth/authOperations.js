import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, storage } from '../../../config';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    const { name, email, password, localAvatar } = credentials;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (localAvatar) {
        const avatar = await fetch(localAvatar);
        const blobAvatar = await avatar.blob();
        const blobLocalAvatar = 'avatars/' + blobAvatar._data.blobId;

        await uploadBytes(ref(storage, blobLocalAvatar), blobAvatar);
        const avatarURL = await getDownloadURL(ref(storage, blobLocalAvatar));
        await updateProfile(user, {
          displayName: name,
          photoURL: avatarURL,
        });
        return { uid: user.uid, email, name, avatarURL };
      } else {
        await updateProfile(user, {
          displayName: name,
        });
        return { uid: user.uid, email, name, avatarURL: '' };
      }
    } catch (error) {
      alert(`RegisterError, ${error.message}`);
      return rejectWithValue(error.message);
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
      alert(`LogoutError, ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  'auth/changeAvatar',
  async (localAvatar, { rejectWithValue }) => {
    try {
      const avatar = await fetch(localAvatar);
      const blobAvatar = await avatar.blob();
      const blobLocalAvatar = 'avatars/' + blobAvatar._data.blobId;

      await uploadBytes(ref(storage, blobLocalAvatar), blobAvatar);
      const avatarURL = await getDownloadURL(ref(storage, blobLocalAvatar));
      await updateProfile(auth.currentUser, {
        photoURL: avatarURL,
      });

      return avatarURL;
    } catch (error) {
      alert(`changeAvatar, ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  'auth/deleteAvatar',
  async (_, { rejectWithValue }) => {
    try {
      const { photoURL } = auth.currentUser;
      await deleteObject(ref(storage, photoURL));
    } catch (error) {
      alert(`deleteAvatar, ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);
