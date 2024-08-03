import { TransactionsListType } from 'store/slices/transactionsSlice';

export type TransactionsStateType = {
  list: TransactionsListType;
  responseState: {
    isLoading: boolean;
    errorMessage: string;
  };
};
