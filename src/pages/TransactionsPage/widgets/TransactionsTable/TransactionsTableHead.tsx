import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { TableFilterMenu } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableFilterMenu.tsx';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { useAppSelector } from 'store/store.ts';

interface TransactionsTableHeadProps {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilterOrder: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
}

// @ts-ignore
export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({ sortingOrder, setSortingOrder }) => {
  const transactionsList = useAppSelector((state) => state.transactions.list);
  const order = Object.keys(transactionsList);

  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: '110px', padding: 0 }}>
          <TableFilterMenu fieldKey="time" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>

        {/*Type*/}
        <th style={{ width: '60px', padding: 0 }}>
          <TableFilterMenu fieldKey="type" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>

        {/*Sum*/}
        <th style={{ padding: 0 }}>
          <TableFilterMenu fieldKey="sum" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>

        {/*Wallets*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableFilterMenu fieldKey="fromWallet" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>

        {/*Category*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <TableFilterMenu fieldKey="category" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>

        {/*Subcategory*/}
        <th style={{ padding: 0 }}>
          <TableFilterMenu fieldKey="subcategory" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} order={order} />
        </th>
      </tr>
    </thead>
  );
};
