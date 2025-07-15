import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsListType, TransactionsStateType } from 'store/slices/transactionsSlice';
import { getAuth } from 'firebase/auth';
import { ResponseHooksType } from 'store';
import { getWalletsTotals } from 'store/slices/transactionsSlice/helpers/getWalletsTotals.ts';
import { getTransactionsQuerySnapshot } from 'store/slices/transactionsSlice/helpers/getTransactionsQuerySnapshot.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { getValidTransactionsList } from 'store/slices/transactionsSlice/helpers/getValidTransactionsList.ts';

export const downloadTransactions = createAsyncThunk<
  { list: TransactionsListType },
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('transactions/downloadTransactions', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;

    try {
      const transactionsList = getValidTransactionsList(await getTransactionsQuerySnapshot(user.uid));
      return { list: transactionsList };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDownloadTransactionsExtraReducers = (builder: ActionReducerMapBuilder<TransactionsStateType>) => {
  builder
    .addCase(downloadTransactions.pending, (state, action) => {
      state.responseState.isLoading = true;
      state.responseState.errorMessage = '';

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(downloadTransactions.fulfilled, (state, action) => {
      state.list = action.payload.list;
      state.walletsTransactionsTotals = getWalletsTotals(action.payload.list);

      state.responseState.isLoading = false;
      state.responseState.errorMessage = '';

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
