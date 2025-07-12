import { Dispatch, FC, SetStateAction } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Hooks
import { useSetFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useSetFilter.ts';
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
  filters: TransactionsFilterType<keyof TransactionType>[];
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const TransactionsListHead: FC<TransactionsListHeadProps> = ({
  transactions,
  filtrationCalculationsObject,
  sortingOrder,
  setSortingOrder,
  filters,
  setFilters,
}) => {
  return (
    <div className="d-flex">
      {/*Time*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="time"
        transactions={transactions}
        order={filtrationCalculationsObject.ordersForFilterOptions['time']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'time', filters: filters })}
        setFilterDispatcher={useSetFilter({ fieldKey: 'time', setFilters: setFilters })}
        filtersLength={filters.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['time']}
      />

      {/*Sum*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="sum"
        transactions={transactions}
        order={filtrationCalculationsObject.ordersForFilterOptions['sum']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'sum', filters: filters })}
        setFilterDispatcher={useSetFilter({ fieldKey: 'sum', setFilters: setFilters })}
        filtersLength={filters.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['sum']}
      />

      {/*Category*/}
      <TransactionsTableSortingFilteringMenu
        fieldKey="category"
        transactions={transactions}
        order={filtrationCalculationsObject.ordersForFilterOptions['category']}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={getCurrentFilter({ fieldKey: 'category', filters: filters })}
        setFilterDispatcher={useSetFilter({ fieldKey: 'category', setFilters: setFilters })}
        filtersLength={filters.length}
        filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['category']}
      />
    </div>
  );
};
