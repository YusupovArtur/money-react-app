import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionsListType, TransactionsStateType } from 'store/slices/transactionsSlice';
import { addDownloadOperationsExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/downloadTransactions.ts';
import { addAddTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/addTransaction.ts';
import { addUpdateTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/updateTransaction.ts';
import { addDeleteTransactionExtraReducers } from 'store/slices/transactionsSlice/asyncThunks/deleteTransaction.ts';

const initialState: TransactionsStateType = {
  list: {},
  responseState: {
    isLoading: false,
    errorMessage: '',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {
    clearTransactions(state) {
      state.list = {};
    },
    setTransactions(state, action: PayloadAction<TransactionsListType>) {
      state.list = action.payload;
    },
  },

  extraReducers: (builder) => {
    addDownloadOperationsExtraReducers(builder);
    addAddTransactionExtraReducers(builder);
    addUpdateTransactionExtraReducers(builder);
    addDeleteTransactionExtraReducers(builder);
  },
});

export const { clearTransactions, setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
