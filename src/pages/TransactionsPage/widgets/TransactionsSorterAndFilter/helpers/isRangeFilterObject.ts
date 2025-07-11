import { RangeFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export const isRangeFilterObject = (obj: any): obj is RangeFilterType => {
  return (
    obj &&
    typeof obj === 'object' &&
    'min' in obj &&
    'max' in obj &&
    (typeof obj.min === 'number' || obj.min === null) &&
    (typeof obj.max === 'number' || obj.max === null)
  );
};
