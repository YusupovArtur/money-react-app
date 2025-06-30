import { FC, useDeferredValue, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { useAppSelector } from 'store/store.ts';
// Components
import { TransactionsTableRow } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableRow.tsx';
import { TransactionsTableHead } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableHead.tsx';
// Helpers
import { getSortedTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getSortedTransactionsOrder.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { getFilteredTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getFilteredTransactionsOrder.ts';
// Types
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
// Style
import './style/transactions-table.scss';

interface TransactionsTableProps {}

export const TransactionsTable: FC<TransactionsTableProps> = () => {
  const transactions = useAppSelector((state) => state.transactions.list);

  const [sortingOrder, setSortingOrder] = useState<TransactionsSortingOrderType>({ key: 'time', order: 'desc' });
  const sortingOrderDeferred = useDeferredValue(sortingOrder);

  const [filter, setFilter] = useState<TransactionsFilterType<keyof TransactionType>>({
    key: 'fromWallet',
    filter: null,
  });
  const filterDeferred = useDeferredValue<TransactionsFilterType<keyof TransactionType>>(filter);

  const orderFiltered = getFilteredTransactionsOrder({
    filter: filterDeferred,
    list: transactions,
    order: Object.keys(transactions),
  });

  const orderSorted = getSortedTransactionsOrder({
    orderedList: { order: orderFiltered, list: transactions },
    filter: sortingOrderDeferred,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetID = (id: string) => {
    searchParams.set('transactionID', id);
    setSearchParams(searchParams);
  };

  // Time
  // Sum
  // Type
  // Wallet
  // Category
  // Subcategory

  return (
    <table className="transactions-table table-hover">
      <TransactionsTableHead
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        filter={filterDeferred}
        setFilter={setFilter}
      />
      <tbody>
        {orderSorted.map((id) => (
          <TransactionsTableRow key={id} id={id} transaction={transactions[id]} setTransactionID={handleSetID} />
        ))}
      </tbody>
    </table>
  );
};
