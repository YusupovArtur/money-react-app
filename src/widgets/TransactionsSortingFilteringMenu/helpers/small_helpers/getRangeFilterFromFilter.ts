import {
  RangeFilterType,
  TransactionsFilterType,
} from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getCurrentFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getCurrentFilter.ts';
import { isRangeFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/isRangeFilter.ts';

export const getRangeFilterFromFilter = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filter: TransactionsFilterType<T>;
}): RangeFilterType => {
  const { fieldKey, filter } = props;
  const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: filter });

  if (isRangeFilter(currentFilter.filter)) {
    return currentFilter.filter;
  }

  return { min: NaN, max: NaN };
};
