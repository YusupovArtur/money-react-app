import { clamp } from 'shared/helpers';

export const shiftIndexes = <T>(props: { order: T[]; index1: number; index2: number; isOldBehaviour?: boolean }): T[] => {
  const { order, isOldBehaviour = false } = props;
  let { index1, index2 } = props;

  index1 = clamp(index1, 0, order.length - 1);
  index2 = clamp(index2, 0, order.length);

  if (index1 === index2) {
    return order;
  }

  const newOrder = [...order];
  const [moved] = newOrder.splice(index1, 1);

  if (isOldBehaviour) {
    index2 = index1 < index2 ? index2 - 1 : index2;
  }

  newOrder.splice(index2, 0, moved);
  return newOrder;
};
