import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsStateType, TransactionType } from 'store/slices/transactionsSlice';
import { db } from 'app/firebase.ts';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';
import { serverResponseStatusHooks } from 'store/types.ts';

export const addTransaction = createAsyncThunk<
  { id: string; operation: TransactionType },
  serverResponseStatusHooks & { operation: TransactionType },
  {
    rejectValue: string;
  }
>('transactions/addTransaction', async (props, { rejectWithValue }) => {
  const { operation } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const transactionsRef = collection(db, 'users_data', user.uid, 'transactions');

    return await addDoc(transactionsRef, operation)
      .then((querySnapshot) => {
        return { id: querySnapshot.id, operation };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
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
      state.list[action.payload.id] = action.payload.operation;

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
