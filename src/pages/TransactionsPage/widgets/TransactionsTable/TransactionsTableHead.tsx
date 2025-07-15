import { Dispatch, FC, SetStateAction } from 'react';
// Store
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Helpers
import { useFilterReducer } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterReducer.ts';
// Types
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
// UI
import { useMediaQuery } from 'shared/hooks';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TRANSACTION_TABLE_PROPORTIONS } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/TRANSACTION_TABLE_PROPORTIONS.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { FiltrationCalculationsObjectType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFiltrationCalculationsObject.ts';

interface TransactionsTableHeadProps {
  transactions: TransactionsListType;
  filtrationCalculationsObject: FiltrationCalculationsObjectType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>[];
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({
  transactions,
  filtrationCalculationsObject,
  sortingOrder,
  setSortingOrder,
  filter,
  setFilter,
}) => {
  const isMedium = useMediaQuery(MEDIUM_WINDOW_MEDIA_QUERY);

  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.timeWidth, padding: 0 }}>
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
        </th>

        {/*Type*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.typeWidth, padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="type"
            transactions={transactions}
            transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['type']}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={getCurrentFilter({ fieldKey: 'type', filters: filter })}
            filterDispatch={useFilterReducer({ fieldKey: 'type', setFilters: setFilter })}
            filtersLength={filter.length}
            filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['type']}
          />
        </th>

        {/*Sum*/}
        <th
          colSpan={TRANSACTION_TABLE_PROPORTIONS.sumColSpan}
          style={{ width: TRANSACTION_TABLE_PROPORTIONS.sumWidth, padding: 0 }}
        >
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
        </th>

        {/*Wallets*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan} style={{ padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="fromWallet"
            transactions={transactions}
            transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['fromWallet']}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={getCurrentFilter({ fieldKey: 'fromWallet', filters: filter })}
            filterDispatch={useFilterReducer({ fieldKey: 'fromWallet', setFilters: setFilter })}
            filtersLength={filter.length}
            filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['fromWallet']}
          />
        </th>

        {/*Category*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.categoryColSpan} style={{ padding: 0 }}>
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
        </th>

        {/*Subcategory*/}
        {!isMedium && (
          <th colSpan={TRANSACTION_TABLE_PROPORTIONS.subcategoryColSpan} style={{ padding: 0 }}>
            <TransactionsTableSortingFilteringMenu
              fieldKey="subcategory"
              transactions={transactions}
              transactionsOrder={filtrationCalculationsObject.ordersForFilterOptions['subcategory']}
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              filter={getCurrentFilter({ fieldKey: 'subcategory', filters: filter })}
              filterDispatch={useFilterReducer({ fieldKey: 'subcategory', setFilters: setFilter })}
              filtersLength={filter.length}
              filtrationOrder={filtrationCalculationsObject.filteringOrdersNumeration['subcategory']}
            />
          </th>
        )}
      </tr>
    </thead>
  );
};
