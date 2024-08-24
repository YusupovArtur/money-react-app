import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsStateType } from 'store/slices/transactionsSlice';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage, ResponseHooksType } from 'store';

export const deleteTransaction = createAsyncThunk<{ id: string }, ResponseHooksType & { id: string }, { rejectValue: string }>(
  'transactions/deleteTransaction',
  async (props, { rejectWithValue }) => {
    const { id } = props;
    const auth = getAuth();

    if (auth.currentUser) {
      const user = auth.currentUser;
      const transactionRef = doc(db, 'users_data', user.uid, 'transactions', id);

      return await deleteDoc(transactionRef)
        .then(() => {
          return { id };
        })
        .catch((error) => {
          return rejectWithValue(getErrorMessage(error));
        });
    } else {
      return rejectWithValue('Вы не авторизованы');
    }
  },
);

export const addDeleteTransactionExtraReducers = (builder: ActionReducerMapBuilder<TransactionsStateType>) => {
  builder
    .addCase(deleteTransaction.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(deleteTransaction.fulfilled, (state, action) => {
      delete state.list[action.payload.id];

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(deleteTransaction.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка удаления транзакции:', action.payload);
    });
};
