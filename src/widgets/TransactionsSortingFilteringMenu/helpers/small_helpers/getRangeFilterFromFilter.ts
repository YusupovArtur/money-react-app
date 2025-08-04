import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getCurrentFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getCurrentFilter.ts';
import { isRangeType } from 'shared/helpers';
import { RangeType } from 'shared/types';

export const getRangeFilterFromFilter = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filter: TransactionsFilterType<T>;
}): RangeType => {
  const { fieldKey, filter } = props;
  const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: filter });

  if (isRangeType(currentFilter.filter)) {
    return currentFilter.filter;
  }

  return { 1: NaN, 2: NaN };
};
