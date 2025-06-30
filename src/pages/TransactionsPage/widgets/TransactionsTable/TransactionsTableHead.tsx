import { Dispatch, FC, SetStateAction } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
// Components
import { TableFilterMenu } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableFilterMenu.tsx';
// Helpers
import { useSetFilter } from 'pages/TransactionsPage/widgets/TransactionsFilter/hooks/useSetFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';

interface TransactionsTableHeadProps {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
}

export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({ sortingOrder, setSortingOrder, filter, setFilter }) => {
  const transactionsList = useAppSelector((state) => state.transactions.list);
  const order = Object.keys(transactionsList);

  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: '110px', padding: 0 }}>
          <TableFilterMenu
            fieldKey="time"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'time', setFilter: setFilter })}
          />
        </th>

        {/*Type*/}
        <th style={{ width: '60px', padding: 0 }}>
          <TableFilterMenu
            fieldKey="type"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'type', setFilter: setFilter })}
          />
        </th>

        {/*Sum*/}
        <th style={{ padding: 0 }}>
          <TableFilterMenu
            fieldKey="sum"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'sum', setFilter: setFilter })}
          />
        </th>

        {/*Wallets*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableFilterMenu
            fieldKey="fromWallet"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'fromWallet', setFilter: setFilter })}
          />
        </th>

        {/*Category*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableFilterMenu
            fieldKey="category"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'category', setFilter: setFilter })}
          />
        </th>

        {/*Subcategory*/}
        <th style={{ padding: 0 }}>
          <TableFilterMenu
            fieldKey="subcategory"
            order={order}
            list={transactionsList}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filter={filter}
            setFilter={useSetFilter({ fieldKey: 'subcategory', setFilter: setFilter })}
          />
        </th>
      </tr>
    </thead>
  );
};
