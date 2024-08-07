import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsStateType, TransactionUpdateType } from 'store/slices/transactionsSlice';
import { db } from 'app/firebase.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getErrorMessage, ResponseHooksType } from 'store';

export const updateTransaction = createAsyncThunk<
  { id: string; operation: TransactionUpdateType },
  ResponseHooksType & { id: string; operation: TransactionUpdateType },
  { rejectValue: string }
>('transactions/updateTransaction', async (props, { rejectWithValue }) => {
  const { id, operation } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const transactionRef = doc(db, 'users_data', user.uid, 'transactions', id);

    return await updateDoc(transactionRef, operation)
      .then(() => {
        return { id, operation };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
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
      state.list[action.payload.id] = { ...state.list[action.payload.id], ...action.payload.operation };

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
