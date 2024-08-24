import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getWalletsOrderedList, WalletsOrderedListType, WalletsStateType } from 'store/slices/walletsSlice';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const downloadWallets = createAsyncThunk<
  WalletsOrderedListType,
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('wallets/downloadWallets', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docsRef = collection(db, 'users_data', user.uid, 'wallets');

    return await getDocs(docsRef)
      .then((querySnapshot) => {
        return getWalletsOrderedList(querySnapshot);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDownloadWalletsExtraReducers = (builder: ActionReducerMapBuilder<WalletsStateType>) => {
  builder
    .addCase(downloadWallets.pending, (state, action) => {
      state.responseState.isLoading = true;
      state.responseState.errorMessage = '';

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(downloadWallets.fulfilled, (state, action) => {
      state.list = action.payload.list;
      state.order = action.payload.order;

      state.responseState.errorMessage = '';
      state.responseState.isLoading = false;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(downloadWallets.rejected, (state, action) => {
      if (action.payload !== undefined) state.responseState.errorMessage = action.payload;
      state.responseState.isLoading = false;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка чтения счетов:', action.payload);
    });
};
