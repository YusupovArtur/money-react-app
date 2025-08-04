import { RangeType } from 'shared/types';

export const isRangeType = (obj: any): obj is RangeType => {
  return obj && typeof obj === 'object' && '1' in obj && '2' in obj && typeof obj[1] === 'number' && typeof obj[2] === 'number';
};
