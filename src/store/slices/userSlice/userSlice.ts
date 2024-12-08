import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, sendEmailVerification } from 'firebase/auth';
// Helpers
import { ResponseHooksType } from 'store';
// Types
import { getUserState, UserStateType, UserType } from 'store/slices/userSlice';
// Async Thunks
import { addSigninWithEmailAndPasswordExtraReducers } from './asyncThunks/signinUserWithEmailAndPassword';
import { addSignupWithEmailAndPasswordExtraReducers } from './asyncThunks/signupUserWithEmailAndPassword';
import { addSigninUserWithGoogleExtraReducers } from './asyncThunks/signinUserWithGoogle';
import { addSigninUserWithGitHubExtraReducers } from './asyncThunks/signinUserWithGitHub';
import { addLogoutUserExtraReducers } from './asyncThunks/logoutUser';
import { addUpdateUserExtraReducers } from './asyncThunks/updateUserState';
import { addUploadUserPhotoExtraReducers } from './asyncThunks/uploadUserPhoto.ts';
import { addFetchPhotoDataURLExtraReducers } from 'store/slices/userSlice/asyncThunks/fetchPhotoDataURL.ts';
import { addDeleteUserPhotoExtraReducers } from 'store/slices/userSlice/asyncThunks/deleteUserPhoto.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const verifyEmail = createAsyncThunk<void, ResponseHooksType>('user/verifyEmail', async (props) => {
  const { setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
      })
      .catch((error) => {
        console.error('Ошибка верификации электронной почты:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
  }
});

const initialState: UserStateType = {
  userState: {
    isUserAuthorised: false,
    email: null,
    username: null,
    id: null,
    isEmailVerified: false,
    photoURL: null,
  },
  isShouldRemember: false,
  photoDataURL: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsRemember(state, action: PayloadAction<boolean>) {
      state.isShouldRemember = action.payload;
    },
    setUserState(state, action: PayloadAction<UserType>) {
      state.userState = action.payload;
    },
    clearUserState(state) {
      state.userState = getUserState(null);
    },
    setPhotoDataURL(state, action: PayloadAction<UserStateType['photoDataURL']>) {
      state.photoDataURL = action.payload;
    },
  },

  extraReducers: (builder) => {
    addSigninWithEmailAndPasswordExtraReducers(builder);
    addSignupWithEmailAndPasswordExtraReducers(builder);
    addSigninUserWithGoogleExtraReducers(builder);
    addSigninUserWithGitHubExtraReducers(builder);
    addLogoutUserExtraReducers(builder);
    addUpdateUserExtraReducers(builder);
    addUploadUserPhotoExtraReducers(builder);
    addFetchPhotoDataURLExtraReducers(builder);
    addDeleteUserPhotoExtraReducers(builder);
  },
});

export const { setUserState, clearUserState, setIsRemember, setPhotoDataURL } = userSlice.actions;
export default userSlice.reducer;
