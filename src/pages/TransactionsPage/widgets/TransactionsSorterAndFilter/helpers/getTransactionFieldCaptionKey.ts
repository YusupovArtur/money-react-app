import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';

export const getTransactionFieldCaptionKey = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  transaction: TransactionType;
}): TransactionFieldCaptionKeyType<T> => {
  const { fieldKey, transaction } = props;

  if (
    fieldKey === 'time' ||
    fieldKey === 'type' ||
    fieldKey === 'fromWallet' ||
    fieldKey === 'toWallet' ||
    fieldKey === 'category' ||
    fieldKey === 'description'
  ) {
    return transaction[fieldKey] as TransactionFieldCaptionKeyType<T>;
  }

  if (fieldKey === 'sum') {
    return { type: transaction.type, sum: transaction.sum } as TransactionFieldCaptionKeyType<T>;
  }

  if (fieldKey === 'subcategory') {
    return {
      categoryID: transaction.category,
      subcategoryID: transaction.subcategory,
    } as TransactionFieldCaptionKeyType<T>;
  }

  return 0 as TransactionFieldCaptionKeyType<T>;
};
