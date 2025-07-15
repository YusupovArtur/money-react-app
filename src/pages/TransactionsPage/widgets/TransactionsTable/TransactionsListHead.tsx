import { Dispatch, FC, SetStateAction } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Hooks
import { useFilterReducer } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterReducer.ts';
// Types
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { FiltrationCalculationsObjectType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFiltrationCalculationsObject.ts';

interface TransactionsListHeadProps {
  transactions: TransactionsListType;
  filtrationCalculationsObject: FiltrationCalculationsObjectType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>[];
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const TransactionsListHead: FC<TransactionsListHeadProps> = ({
  transactions,
  filtrationCalculationsObject,
  sortingOrder,
  setSortingOrder,
  filter,
  setFilter,
}) => {
  return (
    <div className="d-flex">
      {/*Time*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="time"
        transactions={transactions}
        transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['time']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'time', filters: filter })}
        filterDispatch={useFilterReducer({ fieldKey: 'time', setFilters: setFilter })}
        filtersLength={filter.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['time']}
      />

      {/*Sum*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="sum"
        transactions={transactions}
        transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['sum']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'sum', filters: filter })}
        filterDispatch={useFilterReducer({ fieldKey: 'sum', setFilters: setFilter })}
        filtersLength={filter.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['sum']}
      />

      {/*Category*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="category"
        transactions={transactions}
        transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['category']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'category', filters: filter })}
        filterDispatch={useFilterReducer({ fieldKey: 'category', setFilters: setFilter })}
        filtersLength={filter.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['category']}
      />
    </div>
  );
};
