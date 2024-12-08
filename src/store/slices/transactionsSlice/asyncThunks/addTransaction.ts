import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsStateType, TransactionType } from 'store/slices/transactionsSlice';
import { db } from 'app/firebase.ts';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ResponseHooksType } from 'store';
import { addTransactionToWalletsTotals } from 'store/slices/transactionsSlice/helpers/addTransactionToWalletsTotals.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const addTransaction = createAsyncThunk<
  { id: string; transaction: TransactionType },
  ResponseHooksType & { transaction: TransactionType },
  {
    rejectValue: string;
  }
>('transactions/addTransaction', async (props, { rejectWithValue }) => {
  const transaction: TransactionType = { ...props.transaction, sum: Math.abs(props.transaction.sum) };
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const transactionsRef = collection(db, 'users_data', user.uid, 'transactions');

    return await addDoc(transactionsRef, transaction)
      .then((querySnapshot) => {
        return { id: querySnapshot.id, transaction: transaction };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addAddTransactionExtraReducers = (builder: ActionReducerMapBuilder<TransactionsStateType>) => {
  builder
    .addCase(addTransaction.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(addTransaction.fulfilled, (state, action) => {
      state.list[action.payload.id] = action.payload.transaction;
      addTransactionToWalletsTotals({ totals: state.walletsTransactionsTotals, transaction: action.payload.transaction });

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(addTransaction.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка добавления транзакции:', action.payload);
    });
};
