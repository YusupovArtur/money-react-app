import { isSet } from 'shared/helpers';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export const getCurrentFilterSet = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filter: TransactionsFilterType<T>;
}): Set<TransactionType[T]> => {
  const { fieldKey, filter } = props;

  return fieldKey === filter.key && isSet<TransactionType[T]>(filter.filter)
    ? filter.filter
    : (new Set<TransactionType[T]>() as Set<TransactionType[T]>);
};
