import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserState, UserStateType, UserType } from 'store/slices/userSlice';
import { getErrorMessage, ResponseHooksType } from 'store';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

export const signinUserWithGitHub = createAsyncThunk<UserType, ResponseHooksType, { rejectValue: string }>(
  'user/signinWithGitHub',
  async (_props, { rejectWithValue }) => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();

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

export const addSigninUserWithGitHubExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(signinUserWithGitHub.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(signinUserWithGitHub.fulfilled, (state, action) => {
      state.userState = action.payload;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(signinUserWithGitHub.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка авторизации c помощью GitHub:', action.payload);
    });
};
