import { TransactionsOrderedListType } from 'store/slices/transactionsSlice';
import { getTransactionFieldSortingWeight } from 'widgets/TransactionsSortingFilteringMenu/helpers/getTransactionFieldSortingWeight.ts';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';

export const getSortedTransactionsOrder = (props: {
  orderedList: TransactionsOrderedListType;
  sortingOrder: TransactionsSortingOrderType;
}): string[] => {
  const { orderedList, sortingOrder } = props;
  const { order, list } = orderedList;

  return order.toSorted((a, b) => {
    const valueA = getTransactionFieldSortingWeight({ transaction: list[a], fieldKey: sortingOrder.key });
    const valueB = getTransactionFieldSortingWeight({ transaction: list[b], fieldKey: sortingOrder.key });

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (sortingOrder.order === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortingOrder.order === 'asc') {
        return -valueA.localeCompare(valueB);
      } else {
        return -valueB.localeCompare(valueA);
      }
    }

    return 0;
  });
};
