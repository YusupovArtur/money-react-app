import {
  RangeFilterType,
  TransactionsFilterType,
} from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getCurrentFilter.ts';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/isRangeFilterObject.ts';

export const getRangeFilterFromFilter = (props: {
  fieldKey: keyof TransactionType;
  filter: TransactionsFilterType<keyof TransactionType>;
}): RangeFilterType => {
  const { fieldKey, filter } = props;
  const currentFilter = getCurrentFilter({ fieldKey, filter });

  if (isRangeFilterObject(currentFilter.filter)) {
    return currentFilter.filter;
  }

  return { min: NaN, max: NaN };
};
