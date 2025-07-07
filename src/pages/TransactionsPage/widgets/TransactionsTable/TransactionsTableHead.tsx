import { Dispatch, FC, SetStateAction } from 'react';
// Store
// Components
import { TableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableSortingFilteringMenu.tsx';
// Helpers
import { useSetFilter } from 'pages/TransactionsPage/widgets/TransactionsFilter/hooks/useSetFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
// UI
import { useMediaQuery } from 'shared/hooks';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/constants/MEDIA_QUERY_CONSTANTS.ts';

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
        <th style={{ width: '110px', padding: 0 }}>
          <TableSortingFilteringMenu
            fieldKey="time"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'time', setFilter: setFilter })}
          />
        </th>

        {/*Type*/}
        <th style={{ width: '60px', padding: 0 }}>
          <TableSortingFilteringMenu
            fieldKey="type"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'type', setFilter: setFilter })}
          />
        </th>

        {/*Sum*/}
        <th style={{ padding: 0 }}>
          <TableSortingFilteringMenu
            fieldKey="sum"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'sum', setFilter: setFilter })}
          />
        </th>

        {/*Wallets*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableSortingFilteringMenu
            fieldKey="fromWallet"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'fromWallet', setFilter: setFilter })}
          />
        </th>

        {/*Category*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableSortingFilteringMenu
            fieldKey="category"
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'category', setFilter: setFilter })}
          />
        </th>

        {/*Subcategory*/}
        {!isMedium && (
          <th style={{ padding: 0 }}>
            <TableSortingFilteringMenu
              fieldKey="subcategory"
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              filter={filter}
              setFilter={useSetFilter({ fieldKey: 'subcategory', setFilter: setFilter })}
            />
          </th>
        )}
      </tr>
    </thead>
  );
};
