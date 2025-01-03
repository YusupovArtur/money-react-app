import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { selectTransaction, TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store';

const isSet = <T>(value: any): value is Set<T> => {
  return value instanceof Set;
};
type RangeType = { max: number | null; min: number | null };
const isRangeFilter = (value: any): value is RangeType => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'max' in value &&
    'min' in value &&
    (typeof value.max === 'number' || value.max === null) &&
    (typeof value.min === 'number' || value.min === null)
  );
};

export const getFilteredTransactionsOrder = <T extends keyof TransactionType>(props: {
  order: string[];
  filter: TransactionsFilterType<T>;
}): string[] => {
  const { order, filter } = props;
  const key = filter.key;

  if (filter.filter === null) {
    return order;
  }

  if (isSet(filter.filter)) {
    const state = store.getState();
    return order.filter((id) => {
      const transaction = selectTransaction(id)(state);
      if (!transaction) {
        return false;
      }

      if (key === 'fromWallet' || key === 'toWallet') {
        return (
          (filter.filter as Set<TransactionType['fromWallet']>).has(transaction.fromWallet) ||
          (filter.filter as Set<TransactionType['toWallet']>).has(transaction.toWallet)
        );
      }

      return (filter.filter as Set<TransactionType[T]>).has(transaction[key]);
    });
  }

  if (isRangeFilter(filter.filter) && (key === 'time' || key === 'sum')) {
    const range = filter.filter as RangeType;
    const state = store.getState();

    if (range.min !== null && range.max === null) {
      return order.filter((id) => {
        const transaction = selectTransaction(id)(state);
        if (!transaction) {
          return false;
        }
        return (transaction[key] as number) >= (range.min as number);
      });
    }

    if (range.min === null && range.max !== null) {
      return order.filter((id) => {
        const transaction = selectTransaction(id)(state);
        if (!transaction) {
          return false;
        }
        return (transaction[key] as number) >= (range.max as number);
      });
    }

    if (range.min !== null && range.max !== null) {
      return order.filter((id) => {
        const transaction = selectTransaction(id)(state);
        if (!transaction) {
          return false;
        }
        return (transaction[key] as number) >= (range.min as number) && (transaction[key] as number) <= (range.max as number);
      });
    }
  }

  return order;
};
