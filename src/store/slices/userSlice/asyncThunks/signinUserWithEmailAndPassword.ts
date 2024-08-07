import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// Helpers
import { getErrorMessage, ResponseHooksType } from 'store';
import getUserState from 'store/slices/userSlice/helpers/getUserState.ts';
// Types
import { UserSliceStateType, UserStateType } from 'store/slices/userSlice';

export const signinUserWithEmailAndPassword = createAsyncThunk<
  UserStateType,
  ResponseHooksType & { email: string; password: string },
  { rejectValue: string }
>('user/signinWithEmailAndPassword', async function (props, { rejectWithValue }) {
  const { email, password } = props;
  const auth = getAuth();

  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return getUserState(user);
    })
    .catch((error) => {
      return rejectWithValue(getErrorMessage(error.code));
    });
});

export const addSigninWithEmailAndPasswordExtraReducers = (builder: ActionReducerMapBuilder<UserSliceStateType>) => {
  builder
    .addCase(signinUserWithEmailAndPassword.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(signinUserWithEmailAndPassword.fulfilled, (state, action) => {
      state.userState = action.payload;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(signinUserWithEmailAndPassword.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка авторизации с почтой и паролем:', action.payload);
    });
};
