import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// Helpers
import { getErrorMessage, ResponseHooksType } from 'store';
// Types
import { getUserState, UserStateType, UserType } from 'store/slices/userSlice';

export const signinUserWithGoogle = createAsyncThunk<UserType, ResponseHooksType, { rejectValue: string }>(
  'user/signinWithGoogle',
  async (_props, { rejectWithValue }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        return getUserState(user);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
      });
  },
);

export const addSigninUserWithGoogleExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(signinUserWithGoogle.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(signinUserWithGoogle.fulfilled, (state, action) => {
      state.userState = action.payload;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(signinUserWithGoogle.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка авторизации c помощью Google:', action.payload);
    });
};
