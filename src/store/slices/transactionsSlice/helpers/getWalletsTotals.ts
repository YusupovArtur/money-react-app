import { TransactionsListType } from 'store/slices/transactionsSlice';
import { WalletsTransactionsTotalsType } from 'store/slices/transactionsSlice/types/WalletsTransactionsTotalsType.ts';
import { addTransactionToWalletsTotals } from './addTransactionToWalletsTotals.ts';

export const getWalletsTotals = (transactions: TransactionsListType): WalletsTransactionsTotalsType => {
  const totals: WalletsTransactionsTotalsType = {};

  for (const transactionID in transactions) {
    const transaction = transactions[transactionID];
    addTransactionToWalletsTotals({ totals, transaction });
  }

  return totals;
};
