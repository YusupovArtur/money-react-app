import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, sendEmailVerification } from 'firebase/auth';
// Helpers
import getErrorMessage from 'store/helpers/getErrorMessage.ts';
import getUserState from 'store/slices/userSlice/helpers/getUserState.ts';
// Types
import UserStateType from 'store/slices/userSlice/types/UserStateType.ts';
import { serverResponseStatusHooks } from 'store/types.ts';
// Async Thunks
import UserSliceStateType from './types/UserSliceStateType.ts';
import { addSigninWithEmailAndPasswordExtraReducers } from './asyncThunks/signinUserWithEmailAndPassword.ts';
import { addSignupWithEmailAndPasswordExtraReducers } from './asyncThunks/signupUserWithEmailAndPassword.ts';
import { addSigninUserWithGoogleExtraReducers } from './asyncThunks/signinUserWithGoogle.ts';
import { addSigninUserWithGitHubExtraReducers } from './asyncThunks/signinUserWithGitHub.ts';
import { addLogoutUserExtraReducers } from './asyncThunks/logoutUser.ts';
import { addUpdateUserExtraReducers } from './asyncThunks/updateUserState.ts';

export const verifyEmail = createAsyncThunk<void, serverResponseStatusHooks>('user/verifyEmail', async (props) => {
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

const initialState: UserSliceStateType = {
  userState: { isUserAuthorised: false, email: null, username: null, id: null, isEmailVerified: false, photoURL: null },
  isShouldRemember: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsRemember(state, action: PayloadAction<boolean>) {
      state.isShouldRemember = action.payload;
    },
    setUserState(state, action: PayloadAction<UserStateType>) {
      state.userState = action.payload;
    },
    clearUserState(state) {
      state.userState = getUserState(null);
    },
  },

  extraReducers: (builder) => {
    addSigninWithEmailAndPasswordExtraReducers(builder);
    addSignupWithEmailAndPasswordExtraReducers(builder);
    addSigninUserWithGoogleExtraReducers(builder);
    addSigninUserWithGitHubExtraReducers(builder);
    addLogoutUserExtraReducers(builder);
    addUpdateUserExtraReducers(builder);
  },
});

export const { setUserState, clearUserState, setIsRemember } = userSlice.actions;
export default userSlice.reducer;
