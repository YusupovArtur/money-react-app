import { TransactionsListType } from 'store/slices/transactionsSlice';
import { ResponseStateType } from 'store';

export type TransactionsStateType = {
  list: TransactionsListType;
  responseState: ResponseStateType;
};
