import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { WalletsStateType } from 'store/slices/walletsSlice';
import { shiftIndexes } from 'store/helpers/shiftIndexes.ts';

export const shiftWallet = createAsyncThunk<
  string[] | void,
  ResponseHooksType & { index1: number; index2: number },
  { rejectValue: string }
>('wallets/shiftWallet', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { index1, index2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'wallets', 'order');

    // noinspection DuplicatedCode
    if (index1 === index2) {
      return;
    }

    return await runTransaction(db, async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      const order = orderSnapshot.data() ? (orderSnapshot.data() as { order: string[] }).order : [];
      const newOrder = shiftIndexes({ order: order, index1: index1, index2: index2 });

      transaction.set(orderRef, { order: newOrder });
      return newOrder;
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addShiftWalletExtraReducers = (builder: ActionReducerMapBuilder<WalletsStateType>) => {
  builder
    .addCase(shiftWallet.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(shiftWallet.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) state.order = action.payload;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(shiftWallet.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка сортировки счетов:', action.payload);
    });
};
