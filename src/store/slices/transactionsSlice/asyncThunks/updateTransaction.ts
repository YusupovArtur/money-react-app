import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsStateType, TransactionUpdateType } from 'store/slices/transactionsSlice';
import { db } from 'app/firebase.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ResponseHooksType } from 'store';
import { addTransactionToWalletsTotals } from 'store/slices/transactionsSlice/helpers/addTransactionToWalletsTotals.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const updateTransaction = createAsyncThunk<
  { id: string; operationProps: TransactionUpdateType },
  ResponseHooksType & { id: string; operationProps: TransactionUpdateType },
  { rejectValue: string }
>('transactions/updateTransaction', async (props, { rejectWithValue }) => {
  const { id, operationProps } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const transactionRef = doc(db, 'users_data', user.uid, 'transactions', id);

    return await updateDoc(transactionRef, operationProps)
      .then(() => {
        return { id, operationProps };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateTransactionExtraReducers = (builder: ActionReducerMapBuilder<TransactionsStateType>) => {
  builder
    .addCase(updateTransaction.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(updateTransaction.fulfilled, (state, action) => {
      const prevTransaction = state.list[action.payload.id];
      const nextTransaction = { ...state.list[action.payload.id], ...action.payload.operationProps };

      addTransactionToWalletsTotals({
        action: 'decrease',
        totals: state.walletsTransactionsTotals,
        transaction: prevTransaction,
      });
      addTransactionToWalletsTotals({ totals: state.walletsTransactionsTotals, transaction: nextTransaction });

      state.list[action.payload.id] = nextTransaction;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(updateTransaction.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка изменения транзакции:', action.payload);
    });
};
