import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsListType, TransactionsStateType, TransactionType } from 'store/slices/transactionsSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getAuth } from 'firebase/auth';
import { serverResponseStatusHooks } from 'store/types.ts';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';

export const downloadTransactions = createAsyncThunk<
  TransactionsListType,
  serverResponseStatusHooks,
  {
    rejectValue: string;
  }
>('transactions/downloadTransactions', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const transactionsRef = collection(db, 'users_data', user.uid, 'transactions');

    return await getDocs(transactionsRef)
      .then((querySnapshot) => {
        const transactionsList: TransactionsListType = {};
        querySnapshot.forEach((doc) => {
          transactionsList[doc.id] = doc.data() as TransactionType;
        });
        return transactionsList;
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDownloadOperationsExtraReducers = (builder: ActionReducerMapBuilder<TransactionsStateType>) => {
  builder
    .addCase(downloadTransactions.pending, (state, action) => {
      state.responseState.isLoading = true;
      state.responseState.errorMessage = '';
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(downloadTransactions.fulfilled, (state, action) => {
      state.list = action.payload;
      state.responseState.isLoading = false;
      state.responseState.errorMessage = '';

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(downloadTransactions.rejected, (state, action) => {
      state.responseState.isLoading = false;
      if (action.payload !== undefined) state.responseState.errorMessage = action.payload;
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка чтения транзакций:', action.payload);
    });
};
