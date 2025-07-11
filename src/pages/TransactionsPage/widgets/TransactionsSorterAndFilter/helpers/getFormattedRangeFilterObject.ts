import { RangeFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export const getFormattedRangeFilterObject = (obj: RangeFilterType): RangeFilterType => {
  const formattedObj = { min: NaN, max: NaN };

  if (obj.min === null || isNaN(obj.min)) {
    formattedObj.min = -Infinity;
  } else {
    formattedObj.min = obj.min;
  }

  if (obj.max === null || isNaN(obj.max)) {
    formattedObj.max = Infinity;
  } else {
    formattedObj.max = obj.max;
  }

  if (formattedObj.min > formattedObj.max) {
    const prev = formattedObj.min;
    formattedObj.min = formattedObj.max;
    formattedObj.max = prev;
  }

  return formattedObj;
};
