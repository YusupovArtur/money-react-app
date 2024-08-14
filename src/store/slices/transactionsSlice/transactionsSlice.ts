import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
import { TransactionsListType, TransactionsStateType } from 'store/slices/transactionsSlice';
import { ResponseStateType } from 'store';
// Extra reducers
import { addDownloadTransactionsExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/downloadTransactions.ts';
import { addAddTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/addTransaction.ts';
import { addUpdateTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/updateTransaction.ts';
import { addDeleteTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/deleteTransaction.ts';

const initialState: TransactionsStateType = {
  list: {},
  responseState: {
    isLoading: undefined,
    errorMessage: '',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {
    clearTransactions(state) {
      state.list = {};
      state.responseState = { isLoading: false, errorMessage: 'Вы не авторизованы' };
    },
    setTransactions(state, action: PayloadAction<TransactionsListType>) {
      state.list = action.payload;
      state.responseState = { isLoading: false, errorMessage: '' };
    },
    setTransactionsResponseState(state, action: PayloadAction<ResponseStateType>) {
      state.responseState = action.payload;
      if (action.payload.errorMessage) console.error('Ошибка чтения транзакций', action.payload.errorMessage);
    },
  },

  extraReducers: (builder) => {
    addDownloadTransactionsExtraReducers(builder);
    addAddTransactionExtraReducers(builder);
    addUpdateTransactionExtraReducers(builder);
    addDeleteTransactionExtraReducers(builder);
  },
});

export const { clearTransactions, setTransactions, setTransactionsResponseState } = transactionsSlice.actions;
export default transactionsSlice.reducer;
