import { RangeType } from 'shared/types';

export const getFormattedRangeFilterObject = (obj: RangeType): RangeType => {
  const formattedObj = { 1: NaN, 2: NaN };

  if (obj[1] === null || isNaN(obj[1])) {
    formattedObj[1] = -Infinity;
  } else {
    formattedObj[1] = obj[1];
  }

  if (obj[2] === null || isNaN(obj[2])) {
    formattedObj[2] = Infinity;
  } else {
    formattedObj[2] = obj[2];
  }

  if (formattedObj[1] > formattedObj[2]) {
    const prev = formattedObj[1];
    formattedObj[1] = formattedObj[2];
    formattedObj[2] = prev;
  }

  return formattedObj;
};
