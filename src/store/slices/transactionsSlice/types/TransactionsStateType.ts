import { TransactionsListType } from './TransactionsListType.ts';
import { ResponseStateType } from 'store';
import { WalletsTransactionsTotalsType } from './WalletsTransactionsTotalsType.ts';

export type TransactionsStateType = {
  list: TransactionsListType;
  responseState: ResponseStateType;
  walletsTransactionsTotals: WalletsTransactionsTotalsType;
};
