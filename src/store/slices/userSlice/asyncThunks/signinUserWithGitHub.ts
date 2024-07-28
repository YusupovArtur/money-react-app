import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import UserStateType from 'store/slices/userSlice/types/UserStateType.ts';
import { serverResponseStatusHooks } from 'store/types.ts';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import getUserState from '../helpers/getUserState.ts';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';
import UserSliceStateType from 'store/slices/userSlice/types/UserSliceStateType.ts';

const signinUserWithGitHub = createAsyncThunk<UserStateType, serverResponseStatusHooks, { rejectValue: string }>(
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

export const addSigninUserWithGitHubExtraReducers = (builder: ActionReducerMapBuilder<UserSliceStateType>) => {
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

export default signinUserWithGitHub;
