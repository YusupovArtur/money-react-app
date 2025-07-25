import {
  RangeFilterType,
  TransactionsFilterType,
} from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/isRangeFilterObject.ts';

export const getRangeFilterFromFilter = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filter: TransactionsFilterType<T>;
}): RangeFilterType => {
  const { fieldKey, filter } = props;
  const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: filter });

  if (isRangeFilterObject(currentFilter.filter)) {
    return currentFilter.filter;
  }

  return { min: NaN, max: NaN };
};
