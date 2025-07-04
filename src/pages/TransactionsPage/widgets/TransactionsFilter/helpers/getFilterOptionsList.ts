import { selectTransaction, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType.ts';
import { getTransactionFieldCaptionKey } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getTransactionFieldCaptionKey.ts';
import { store } from 'store/index.ts';
import { getTransactionFieldSortingWeight } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getTransactionFieldSortingWeight.ts';

export const getFilterOptionsList = <T extends keyof TransactionType>(props: {
  key: keyof TransactionType;
  order: string[];
  // orderedList: TransactionsOrderedListType;
}): { options: TransactionType[T][]; optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>> } => {
  const { order, key } = props;
  const state = store.getState();

  const options = new Set<TransactionType[T]>();
  const optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>> = {} as Record<
    TransactionType[T],
    TransactionFieldCaptionKeyType<T>
  >;

  if (key !== 'toWallet' && key !== 'fromWallet') {
    order.forEach((id) => {
      const transaction = selectTransaction(id)(state);
      if (transaction) {
        const field =
          key === 'sum' ? (transaction['type'] === 'expense' ? -transaction['sum'] : transaction['sum']) : transaction[key];

        if (!options.has(field as TransactionType[T])) {
          options.add(field as TransactionType[T]);
          optionKeys[field as TransactionType[T]] = getTransactionFieldCaptionKey({
            key,
            transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }
      }
    });
  } else {
    order.forEach((id) => {
      const transaction = selectTransaction(id)(state);
      if (transaction) {
        if (transaction.fromWallet !== '' && !options.has(transaction.fromWallet as TransactionType[T])) {
          options.add(transaction['fromWallet'] as TransactionType[T]);
          optionKeys[transaction['fromWallet'] as TransactionType[T]] = getTransactionFieldCaptionKey({
            key: 'fromWallet',
            transaction: transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }

        if (transaction.toWallet !== '' && !options.has(transaction.toWallet as TransactionType[T])) {
          options.add(transaction['toWallet'] as TransactionType[T]);
          optionKeys[transaction['toWallet'] as TransactionType[T]] = getTransactionFieldCaptionKey({
            key: 'toWallet',
            transaction: transaction,
          }) as TransactionFieldCaptionKeyType<T>;
        }
      }
    });
  }

  const optionsArray = Array.from(options);
  const filteredOptionsArray = optionsArray.sort((a, b) => {
    const valueA = getTransactionFieldSortingWeight({ key, transactionFieldCaptionKey: optionKeys[a] });
    const valueB = getTransactionFieldSortingWeight({ key, transactionFieldCaptionKey: optionKeys[b] });

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueB - valueA;
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueB.localeCompare(valueA);
    }

    return 0;
  });

  return { options: filteredOptionsArray, optionKeys };
};
