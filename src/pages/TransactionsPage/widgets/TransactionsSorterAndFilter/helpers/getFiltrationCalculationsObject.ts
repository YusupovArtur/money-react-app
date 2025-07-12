import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { getFilteredTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFilteredTransactionsOrder.ts';

export type FiltrationCalculationsObjectType = {
  order: string[];
  ordersForFilterOptions: Record<keyof TransactionType, string[]>;
  filteringOrdersNumeration: Partial<Record<keyof TransactionType, number>>;
};

interface GetFiltrationCalculationsObject {
  (props: {
    filters: TransactionsFilterType<keyof TransactionType>[];
    order: string[];
    list: TransactionsListType;
  }): FiltrationCalculationsObjectType;
}

const transactionKeys: (keyof TransactionType)[] = ['type', 'time', 'sum', 'fromWallet', 'toWallet', 'category', 'subcategory'];

export const getFiltrationCalculationsObject: GetFiltrationCalculationsObject = (props) => {
  const { filters, order, list } = props;

  let currentOrder: string[] = [...order];
  const ordersForFilterOptions: Record<keyof TransactionType, string[]> = {
    type: [],
    time: [],
    sum: [],
    fromWallet: [],
    toWallet: [],
    category: [],
    subcategory: [],
    description: [],
  };
  const filterNumeration: Partial<Record<keyof TransactionType, number>> = {};

  for (const [index, filter] of filters.entries()) {
    ordersForFilterOptions[filter.key] = currentOrder;
    filterNumeration[filter.key] = index + 1;

    currentOrder = getFilteredTransactionsOrder({ filter, order: currentOrder, list });
  }

  for (const key of transactionKeys) {
    if (ordersForFilterOptions[key].length === 0) {
      ordersForFilterOptions[key] = currentOrder;
    }
  }

  return {
    order: currentOrder,
    ordersForFilterOptions: ordersForFilterOptions,
    filteringOrdersNumeration: filterNumeration,
  };
};
