import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserState } from 'store/slices/userSlice';
// Firebase
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// Helpers
import getErrorMessage from 'store/helpers/getErrorMessage.ts';
import getUserState from 'store/slices/userSlice/helpers/getUserState.ts';
// Types
import UserSliceStateType from 'store/slices/userSlice/types/UserSliceStateType.ts';
import UserStateType from 'store/slices/userSlice/types/UserStateType.ts';
import { serverResponseStatusHooks } from 'store/types.ts';

const signupUserWithEmailAndPassword = createAsyncThunk<
  UserStateType,
  serverResponseStatusHooks & { email: string; password: string; username?: string },
  { rejectValue: string }
>('user/signupUserWithEmailAndPassword', async (props, { dispatch, rejectWithValue }) => {
  const { email, password, username } = props;
  const auth = getAuth();
  console.log(props);
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (username) {
        dispatch(updateUserState({ username }));
      }
      return getUserState(user);
    })
    .catch((error) => {
      return rejectWithValue(getErrorMessage(error.code));
    });
});

export const addSignupWithEmailAndPasswordExtraReducers = (builder: ActionReducerMapBuilder<UserSliceStateType>) => {
  builder
    .addCase(signupUserWithEmailAndPassword.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(signupUserWithEmailAndPassword.fulfilled, (state, action) => {
      state.userState = action.payload;
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(signupUserWithEmailAndPassword.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка регистрации с почтой и паролем:', action.payload);
    });
};

export default signupUserWithEmailAndPassword;
