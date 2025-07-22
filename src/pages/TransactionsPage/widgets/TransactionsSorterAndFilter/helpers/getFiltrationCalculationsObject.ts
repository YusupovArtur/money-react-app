import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { getFilteredTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFilteredTransactionsOrder.ts';

export type FiltrationCalculationsObjectType = {
  filteredOrder: string[];
  ordersForFilterOptions: Record<keyof TransactionType, string[]>;
  filteringRanks: Partial<Record<keyof TransactionType, number>>;
  currentFilters: { [K in keyof TransactionType]?: TransactionsFilterType<K> };
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
  const filteringRanks: Partial<Record<keyof TransactionType, number>> = {};
  const currentFilters: { [K in keyof TransactionType]?: TransactionsFilterType<K> } = {};

  for (const [index, filter] of filters.entries()) {
    ordersForFilterOptions[filter.key] = currentOrder;
    currentOrder = getFilteredTransactionsOrder({ filter, order: currentOrder, list });

    filteringRanks[filter.key] = index + 1;
    currentFilters[filter.key as keyof TransactionType] = filter as any;
  }

  for (const key of transactionKeys) {
    if (ordersForFilterOptions[key].length === 0) {
      ordersForFilterOptions[key] = currentOrder;
    }
  }

  return {
    filteredOrder: currentOrder,
    ordersForFilterOptions: ordersForFilterOptions,
    currentFilters: currentFilters,
    filteringRanks: filteringRanks,
  };
};
