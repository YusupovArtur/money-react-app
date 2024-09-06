import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { WalletsStateType, WalletType } from 'store/slices/walletsSlice';
import { ResponseHooksType } from 'store';
import { getAuth } from 'firebase/auth';
import { arrayUnion, collection, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const addWallet = createAsyncThunk<
  { id: string; wallet: WalletType },
  ResponseHooksType & { wallet: WalletType },
  {
    rejectValue: string;
  }
>('wallets/addWallet', async (props, { rejectWithValue }) => {
  const { wallet } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'wallets', 'order');
    const docsRef = collection(db, 'users_data', user.uid, 'wallets');
    const docRef = doc(docsRef);

    const id = docRef.id;
    window.pending.wallets.add.id = id;

    return await runTransaction(db, async (transaction) => {
      transaction.set(docRef, wallet);
      transaction.set(orderRef, { order: arrayUnion(id) }, { merge: true });

      return { id, wallet };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addAddWalletExtraReducers = (builder: ActionReducerMapBuilder<WalletsStateType>) => {
  builder
    .addCase(addWallet.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(addWallet.fulfilled, (state, action) => {
      state.list[action.payload.id] = action.payload.wallet;
      state.order.push(action.payload.id);

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(addWallet.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка добавления счета:', action.payload);
    });
};
