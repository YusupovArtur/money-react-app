import { TransactionsOrderedListType, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType.ts';
import { getTransactionFieldCaptionKey } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getTransactionFieldCaptionKey.ts';

export const getFilterOptionsList = <T extends keyof TransactionType>(props: {
  key: keyof TransactionType;
  orderedList: TransactionsOrderedListType;
}): { options: Array<TransactionType[T]>; optionKeys: Record<T, TransactionFieldCaptionKeyType<T>> } => {
  const { orderedList, key } = props;
  const { list, order } = orderedList;

  const options = new Set<TransactionType[T]>();
  const optionKeys: Record<T, TransactionFieldCaptionKeyType<T>> = {} as Record<T, TransactionFieldCaptionKeyType<T>>;

  if (key !== 'toWallet' && key !== 'fromWallet') {
    order.forEach((id) => {
      if (!options.has(list[id][key] as TransactionType[T])) {
        options.add(list[id][key] as TransactionType[T]);
        optionKeys[list[id][key] as T] = getTransactionFieldCaptionKey({
          key,
          transaction: list[id],
        }) as TransactionFieldCaptionKeyType<T>;
      }
    });
  } else {
    order.forEach((id) => {
      options.add(list[id]['fromWallet'] as TransactionType[T]);
      options.add(list[id]['toWallet'] as TransactionType[T]);
    });
  }

  return { options: Array.from(options), optionKeys };
};
