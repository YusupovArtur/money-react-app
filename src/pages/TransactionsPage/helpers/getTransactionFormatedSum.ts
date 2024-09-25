import { TransactionType } from 'store/slices/transactionsSlice';
import { getStringCurrencyValue } from 'shared/helpers';

export const getTransactionFormatedSum = (transaction: TransactionType): { formatedSum: string; color: string } => {
  const { type, sum } = transaction;

  const color = type === 'expense' ? 'text-danger' : type === 'income' ? 'text-success' : '';
  const sign = type === 'expense' ? 'negative' : 'positive';
  const formatedSum = getStringCurrencyValue({ value: transaction.sum, sign });

  return { color, formatedSum: formatedSum };
};
