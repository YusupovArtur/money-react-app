import { Dispatch, FC, SetStateAction } from 'react';
// Store
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Helpers
import { useSetFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
// UI
import { useMediaQuery } from 'shared/hooks';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TRANSACTION_TABLE_PROPORTIONS } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/TRANSACTION_TABLE_PROPORTIONS.ts';

interface TransactionsTableHeadProps {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
}

export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({ sortingOrder, setSortingOrder, filter, setFilter }) => {
  const isMedium = useMediaQuery(MEDIUM_WINDOW_MEDIA_QUERY);

  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.timeWidth, padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="time"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilterDispatcher={useSetFilter({ fieldKey: 'time', setFilter: setFilter })}
          />
        </th>

        {/*Type*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.typeWidth, padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="type"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilterDispatcher={useSetFilter({ fieldKey: 'type', setFilter: setFilter })}
          />
        </th>

        {/*Sum*/}
        <th
          colSpan={TRANSACTION_TABLE_PROPORTIONS.sumColSpan}
          style={{ width: TRANSACTION_TABLE_PROPORTIONS.sumWidth, padding: 0 }}
        >
          <TransactionsTableSortingFilteringMenu
            fieldKey="sum"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilterDispatcher={useSetFilter({ fieldKey: 'sum', setFilter: setFilter })}
          />
        </th>

        {/*Wallets*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan} style={{ padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="fromWallet"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilterDispatcher={useSetFilter({ fieldKey: 'fromWallet', setFilter: setFilter })}
          />
        </th>

        {/*Category*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.categoryColSpan} style={{ padding: 0 }}>
          <TransactionsTableSortingFilteringMenu
            fieldKey="category"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilterDispatcher={useSetFilter({ fieldKey: 'category', setFilter: setFilter })}
          />
        </th>

        {/*Subcategory*/}
        {!isMedium && (
          <th colSpan={TRANSACTION_TABLE_PROPORTIONS.subcategoryColSpan} style={{ padding: 0 }}>
            <TransactionsTableSortingFilteringMenu
              fieldKey="subcategory"
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              filter={filter}
              setFilterDispatcher={useSetFilter({ fieldKey: 'subcategory', setFilter: setFilter })}
            />
          </th>
        )}
      </tr>
    </thead>
  );
};
