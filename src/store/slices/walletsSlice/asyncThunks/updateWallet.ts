import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { WalletsStateType, WalletUpdateType } from 'store/slices/walletsSlice';
import { getErrorMessage, ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'app/firebase.ts';

export const updateWallet = createAsyncThunk<
  { id: string; walletProps: WalletUpdateType },
  ResponseHooksType & { id: string; walletProps: WalletUpdateType },
  { rejectValue: string }
>('wallets/updateWallet', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { id, walletProps } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'wallets', id);

    return await updateDoc(docRef, walletProps)
      .then(() => {
        return { id, walletProps };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateWalletExtraReducers = (builder: ActionReducerMapBuilder<WalletsStateType>) => {
  builder
    .addCase(updateWallet.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(updateWallet.fulfilled, (state, action) => {
      state.list[action.payload.id] = { ...state.list[action.payload.id], ...action.payload.walletProps };

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(updateWallet.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка обновления счета:', action.payload);
    });
};
