import { isArrayOfStrings } from 'shared/helpers';

export const getValidOrder = (obj: unknown): string[] => {
  if (isArrayOfStrings(obj)) {
    return obj;
  }
  if (obj && typeof obj === 'object' && 'order' in obj && isArrayOfStrings(obj.order)) {
    return obj.order;
  }
  return [];
};
