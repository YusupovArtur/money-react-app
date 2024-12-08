import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { arrayRemove, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { WalletsStateType } from 'store/slices/walletsSlice';

export const deleteWallet = createAsyncThunk<
  { id: string },
  ResponseHooksType & { id: string },
  {
    rejectValue: string;
  }
>('wallets/deleteWallet', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { id } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'wallets', 'order');
    const docRef = doc(db, 'users_data', user.uid, 'wallets', id);

    window.pending.wallets.delete = { id, flags: 2 };

    return await runTransaction(db, async (transaction) => {
      transaction.update(orderRef, { order: arrayRemove(id) });
      transaction.delete(docRef);

      return { id };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDeleteWalletExtraReducers = (builder: ActionReducerMapBuilder<WalletsStateType>) => {
  builder
    .addCase(deleteWallet.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(deleteWallet.fulfilled, (state, action) => {
      state.order = state.order.filter((id) => id !== action.payload.id);
      delete state.list[action.payload.id];

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(deleteWallet.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка удаления счета:', action.payload);
    });
};
