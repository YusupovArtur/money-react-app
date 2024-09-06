import { TransactionType } from 'store/slices/transactionsSlice';

export const getTransactionSignedSum = (transaction: TransactionType): number => {
  return transaction.type === 'expense' ? -Math.abs(transaction.sum) : Math.abs(transaction.sum);
};
