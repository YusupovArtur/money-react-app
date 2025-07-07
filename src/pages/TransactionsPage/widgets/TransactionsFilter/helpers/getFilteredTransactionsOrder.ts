import { TransactionsFilterType } from '../types/TransactionsFilterType.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/isRangeFilterObject.ts';
import { getFormattedRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getFormattedRangeFilterObject.ts';

const isSet = <T>(value: any): value is Set<T> => {
  return value instanceof Set;
};

export const getFilteredTransactionsOrder = <T extends keyof TransactionType>(props: {
  order: string[];
  list: TransactionsListType;
  filter: TransactionsFilterType<T>;
}): string[] => {
  const { order, list, filter } = props;
  const key = filter.key;

  if (filter.filter === null) {
    return order;
  }

  if (isSet(filter.filter)) {
    return order.filter((id) => {
      const transaction: TransactionType | undefined = list[id];
      if (!transaction) {
        return false;
      }

      if (key === 'sum') {
        return !(filter.filter as Set<TransactionType['sum']>).has(
          transaction.type === 'expense' ? -transaction.sum : transaction.sum,
        );
      }

      if (key === 'fromWallet' || key === 'toWallet') {
        if (transaction.type === 'expense') {
          return !(filter.filter as Set<TransactionType['fromWallet']>).has(transaction.fromWallet);
        }

        if (transaction.type === 'income') {
          return !(filter.filter as Set<TransactionType['toWallet']>).has(transaction.toWallet);
        }

        if (transaction.type === 'transfer') {
          return !(
            (filter.filter as Set<TransactionType['fromWallet']>).has(transaction.fromWallet) &&
            (filter.filter as Set<TransactionType['toWallet']>).has(transaction.toWallet)
          );
        }
      }

      return !(filter.filter as Set<TransactionType[T]>).has(transaction[key]);
    });
  }

  if (isRangeFilterObject(filter.filter) && (key === 'time' || key === 'sum')) {
    const range = getFormattedRangeFilterObject(filter.filter);

    return order.filter((id) => {
      const transaction: TransactionType | undefined = list[id];
      const num = key === 'sum' && transaction.type === 'expense' ? -transaction[key] : (transaction[key] as number);

      return num >= range.min && num <= range.max;
    });
  }

  return order;
};
