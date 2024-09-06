import { TransactionsListType } from 'store/slices/transactionsSlice';
import { getWalletsTotals } from 'store/slices/transactionsSlice/helpers/getWalletsTotals.ts';

export const getWalletTotal = (props: { id: string; transactions: TransactionsListType }): number => {
  const { id, transactions } = props;
  const totals = getWalletsTotals(transactions);

  if (totals[id]) {
    return totals[id];
  } else {
    return 0;
  }
};
