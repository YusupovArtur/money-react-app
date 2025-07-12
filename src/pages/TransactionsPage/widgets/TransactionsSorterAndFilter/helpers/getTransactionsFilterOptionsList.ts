import { getTransactionFieldSortingWeight } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getTransactionFieldSortingWeight.ts';
import { getTransactionFieldCaptionKey } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getTransactionFieldCaptionKey.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';

export const getTransactionsFilterOptionsList = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  order: string[];
  list: TransactionsListType;
  // orderedList: TransactionsOrderedListType;
}): { options: TransactionType[T][]; optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>> } => {
  const { order, fieldKey, list } = props;

  const options = new Set<TransactionType[T]>();
  const optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>> = {} as Record<
    TransactionType[T],
    TransactionFieldCaptionKeyType<T>
  >;

  if (fieldKey !== 'toWallet' && fieldKey !== 'fromWallet') {
    order.forEach((id) => {
      const transaction: TransactionType | undefined = list[id];
      if (transaction) {
        const field =
          fieldKey === 'sum'
            ? transaction['type'] === 'expense'
              ? -transaction['sum']
              : transaction['sum']
            : transaction[fieldKey];

        if (!options.has(field as TransactionType[T])) {
          options.add(field as TransactionType[T]);
          optionKeys[field as TransactionType[T]] = getTransactionFieldCaptionKey({
            fieldKey: fieldKey,
            transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }
      }
    });
  } else {
    order.forEach((id) => {
      const transaction: TransactionType | undefined = list[id];
      if (transaction) {
        if (transaction.fromWallet !== '' && !options.has(transaction.fromWallet as TransactionType[T])) {
          options.add(transaction['fromWallet'] as TransactionType[T]);
          optionKeys[transaction['fromWallet'] as TransactionType[T]] = getTransactionFieldCaptionKey({
            fieldKey: 'fromWallet',
            transaction: transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }

        if (transaction.toWallet !== '' && !options.has(transaction.toWallet as TransactionType[T])) {
          options.add(transaction['toWallet'] as TransactionType[T]);
          optionKeys[transaction['toWallet'] as TransactionType[T]] = getTransactionFieldCaptionKey({
            fieldKey: 'toWallet',
            transaction: transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }
      }
    });
  }

  const optionsArray = Array.from(options);
  const filteredOptionsArray = optionsArray.sort((a, b) => {
    const valueA = getTransactionFieldSortingWeight({ fieldKey: fieldKey, transactionFieldCaptionKey: optionKeys[a] });
    const valueB = getTransactionFieldSortingWeight({ fieldKey: fieldKey, transactionFieldCaptionKey: optionKeys[b] });

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueB - valueA;
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return -valueB.localeCompare(valueA);
    }

    return 0;
  });

  return { options: filteredOptionsArray, optionKeys };
};
