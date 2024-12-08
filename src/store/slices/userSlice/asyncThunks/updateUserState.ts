import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store';
import { getAuth, updateProfile } from 'firebase/auth';
import { UserStateType } from 'store/slices/userSlice';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const updateUserState = createAsyncThunk<
  { username: string | null | undefined; photoURL: string | null | undefined },
  ResponseHooksType & { username?: string; photoURL?: string },
  { rejectValue: string }
>('user/updateUserState', async (props, { rejectWithValue }) => {
  const { username, photoURL } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, { displayName: username, photoURL: photoURL })
      .then(() => {
        return { username, photoURL };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateUserExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(updateUserState.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(updateUserState.fulfilled, (state, action) => {
      if (action.payload.username !== undefined) {
        state.userState.username = action.payload.username;
      }
      if (action.payload.photoURL !== undefined) {
        state.userState.photoURL = action.payload.photoURL;
      }

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(updateUserState.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка обновления данных пользователя:', action.payload);
    });
};
