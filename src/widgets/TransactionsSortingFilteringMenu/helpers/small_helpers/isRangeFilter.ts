import { RangeFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';

export const isRangeFilter = (obj: any): obj is RangeFilterType => {
  return (
    obj && typeof obj === 'object' && 'min' in obj && 'max' in obj && typeof obj.min === 'number' && typeof obj.max === 'number'
  );
};
