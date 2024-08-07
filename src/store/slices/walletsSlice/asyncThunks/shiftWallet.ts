import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { WALLETS_LIST_LAST_ITEM_ID, WalletsStateType } from 'store/slices/walletsSlice';

export const shiftWallet = createAsyncThunk<
  { order: string[] } | void,
  ResponseHooksType & { walletID1: string; walletID2: string },
  { rejectValue: string }
>('wallets/shiftWallet', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { walletID1: id1, walletID2: id2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'wallets', 'order');

    if (id1 === id2) {
      return;
    }

    return await runTransaction(db, async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      const order = orderSnapshot.data() ? (orderSnapshot.data() as { order: string[] }).order : [];

      const index1 = order.findIndex((id) => id1 === id);

      if (index1 !== -1) {
        order.splice(index1, 1);

        if (id2 === WALLETS_LIST_LAST_ITEM_ID) {
          order.push(id1);
          transaction.set(orderRef, { order });
          return { order };
        }

        const index2 = order.findIndex((id) => id2 === id);
        if (index2 !== -1) {
          order.splice(index2, 0, id1);
          transaction.set(orderRef, { order });
          return { order };
        } else {
          return rejectWithValue('No find id2');
        }
      } else {
        return rejectWithValue('Not find id1');
      }
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error.code));
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
      if (action.payload) state.order = action.payload.order;

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
