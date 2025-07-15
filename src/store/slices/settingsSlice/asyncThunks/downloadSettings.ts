import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { SettingsType } from 'store/slices/settingsSlice';
import { getValidSettings } from 'store/slices/settingsSlice/helpers/getValidSettings.ts';
import { SettingsStateType } from 'store/slices/settingsSlice/types/SettingsStateType.ts';

export const downloadSettings = createAsyncThunk<
  SettingsType,
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('settings/downloadSettings', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docsRef = collection(db, 'users_data', user.uid, 'settings');

    return await getDocs(docsRef)
      .then((querySnapshot) => {
        return getValidSettings(querySnapshot);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDownloadSettingsExtraReducers = (builder: ActionReducerMapBuilder<SettingsStateType>) => {
  builder
    .addCase(downloadSettings.pending, (state, action) => {
      state.responseState.isLoading = true;
      state.responseState.errorMessage = '';

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(downloadSettings.fulfilled, (state, action) => {
      state.responseState.errorMessage = '';
      state.responseState.isLoading = false;

      state.settings = action.payload;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(downloadSettings.rejected, (state, action) => {
      if (action.payload !== undefined) state.responseState.errorMessage = action.payload;
      state.responseState.isLoading = false;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка чтения настроек:', action.payload);
    });
};
