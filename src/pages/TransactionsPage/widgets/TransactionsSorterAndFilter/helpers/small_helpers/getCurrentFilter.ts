import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';

export const getCurrentFilter = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filters: TransactionsFilterType<keyof TransactionType> | TransactionsFilterType<keyof TransactionType>[];
}): TransactionsFilterType<T> => {
  const { fieldKey, filters } = props;

  if (Array.isArray(filters)) {
    for (const filter of filters) {
      if (fieldKey === filter.key) {
        return filter as TransactionsFilterType<T>;
      }
    }
  } else {
    if (fieldKey === filters.key) {
      return filters as TransactionsFilterType<T>;
    }
  }

  return { key: fieldKey, filter: null } as TransactionsFilterType<T>;
};
