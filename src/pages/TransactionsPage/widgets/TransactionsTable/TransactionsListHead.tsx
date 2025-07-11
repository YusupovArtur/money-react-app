import { Dispatch, FC, SetStateAction } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Hooks
import { useSetFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

interface TransactionsListHeadProps {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
}

export const TransactionsListHead: FC<TransactionsListHeadProps> = ({ sortingOrder, setSortingOrder, filter, setFilter }) => {
  return (
    <div className="d-flex">
      <TransactionsTableSortingFilteringMenu
        fieldKey="time"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={filter}
        setFilterDispatcher={useSetFilter({ fieldKey: 'time', setFilter: setFilter })}
      />

      <TransactionsTableSortingFilteringMenu
        fieldKey="sum"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={filter}
        setFilterDispatcher={useSetFilter({ fieldKey: 'sum', setFilter: setFilter })}
      />

      <TransactionsTableSortingFilteringMenu
        fieldKey="category"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={filter}
        setFilterDispatcher={useSetFilter({ fieldKey: 'category', setFilter: setFilter })}
      />
    </div>
  );
};
