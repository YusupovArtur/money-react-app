import { TransactionsOrderedListType } from 'store/slices/transactionsSlice';
import { getTransactionFieldSortWeight } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getTransactionFieldSortWeight.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';

export const getSortedTransactionsOrder = (props: {
  orderedList: TransactionsOrderedListType;
  filter: TransactionsSortingOrderType;
}): string[] => {
  const { orderedList, filter } = props;
  const { order, list } = orderedList;

  return order.toSorted((a, b) => {
    const valueA = getTransactionFieldSortWeight({ transaction: list[a], key: filter.key });
    const valueB = getTransactionFieldSortWeight({ transaction: list[b], key: filter.key });

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (filter.order === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (filter.order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }

    return 0;
  });
};
