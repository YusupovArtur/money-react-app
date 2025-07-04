import { TransactionsOrderedListType } from 'store/slices/transactionsSlice';
import { getTransactionFieldSortingWeight } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getTransactionFieldSortingWeight.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';

export const getSortedTransactionsOrder = (props: {
  orderedList: TransactionsOrderedListType;
  filter: TransactionsSortingOrderType;
}): string[] => {
  const { orderedList, filter } = props;
  const { order, list } = orderedList;

  return order.toSorted((a, b) => {
    const valueA = getTransactionFieldSortingWeight({ transaction: list[a], key: filter.key });
    const valueB = getTransactionFieldSortingWeight({ transaction: list[b], key: filter.key });

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
