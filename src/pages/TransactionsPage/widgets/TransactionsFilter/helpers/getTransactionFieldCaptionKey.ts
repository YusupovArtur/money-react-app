import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType.ts';

export const getTransactionFieldCaptionKey = <T extends keyof TransactionType>(props: {
  key: T;
  transaction: TransactionType;
}): TransactionFieldCaptionKeyType<T> => {
  const { key, transaction } = props;

  if (
    key === 'time' ||
    key === 'type' ||
    key === 'fromWallet' ||
    key === 'toWallet' ||
    key === 'category' ||
    key === 'description'
  ) {
    return transaction[key] as TransactionFieldCaptionKeyType<T>;
  }

  if (key === 'sum') {
    return { type: transaction.type, sum: transaction.sum } as TransactionFieldCaptionKeyType<T>;
  }

  if (key === 'subcategory') {
    return {
      categoryID: transaction.category,
      subcategoryID: transaction.subcategory,
    } as TransactionFieldCaptionKeyType<T>;
  }

  return 0 as TransactionFieldCaptionKeyType<T>;
};
