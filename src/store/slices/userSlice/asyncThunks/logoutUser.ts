import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { UserSliceStateType, UserStateType } from 'store/slices/userSlice';
import { serverResponseStatusHooks } from 'store/types.ts';
import { getAuth, signOut } from 'firebase/auth';
import getUserState from '../helpers/getUserState.ts';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';

export const logoutUser = createAsyncThunk<UserStateType, serverResponseStatusHooks, { rejectValue: string }>(
  'user/logoutUser',
  async (_props, { rejectWithValue }) => {
    const auth = getAuth();

    return await signOut(auth)
      .then(() => {
        return getUserState(null);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
      });
  },
);

export const addLogoutUserExtraReducers = (builder: ActionReducerMapBuilder<UserSliceStateType>) => {
  builder
    .addCase(logoutUser.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      state.userState = action.payload;
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(logoutUser.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка выхода пользователя:', action.payload);
    });
};
