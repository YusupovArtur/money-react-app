import { TransactionType } from 'store/slices/transactionsSlice';
import { WalletsTransactionsTotalsType } from 'store/slices/transactionsSlice/types/WalletsTransactionsTotalsType.ts';

export const addTransactionToWalletsTotals = (props: {
  action?: 'increase' | 'decrease';
  totals: WalletsTransactionsTotalsType;
  transaction: TransactionType | undefined;
}): void => {
  const { action = 'increase', totals, transaction } = props;
  if (!transaction) {
    return;
  }

  const sum = action === 'increase' ? transaction.sum : -transaction.sum;

  const fromWalletID = transaction.fromWallet;
  const toWalletID = transaction.toWallet;

  if (fromWalletID) {
    if (totals[fromWalletID]) {
      totals[fromWalletID] -= sum;
    } else {
      totals[fromWalletID] = -sum;
    }
  }

  if (toWalletID) {
    if (totals[toWalletID]) {
      totals[toWalletID] += sum;
    } else {
      totals[toWalletID] = sum;
    }
  }
};
