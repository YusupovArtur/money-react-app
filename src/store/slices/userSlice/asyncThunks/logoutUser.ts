import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserState, UserStateType, UserType } from 'store/slices/userSlice';
import { ResponseHooksType } from 'store';
import { getAuth, signOut } from 'firebase/auth';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const logoutUser = createAsyncThunk<UserType, ResponseHooksType, { rejectValue: string }>(
  'user/logoutUser',
  async (_props, { rejectWithValue }) => {
    const auth = getAuth();

    return await signOut(auth)
      .then(() => {
        return getUserState(null);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  },
);

export const addLogoutUserExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
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
