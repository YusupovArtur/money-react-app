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
// Style
import './style/transactions-table.scss';

interface TransactionsTableProps {}

export const TransactionsTable: FC<TransactionsTableProps> = () => {
  const transactions = useAppSelector((state) => state.transactions.list);
  const [sortingOrder, setSortingOrder] = useState<TransactionsSortingOrderType>({ key: 'type', order: 'desc' });
  const sortingOrderDeferred = useDeferredValue(sortingOrder);

  const orderSorted = getSortedTransactionsOrder({
    orderedList: { order: Object.keys(transactions), list: transactions },
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
      <TransactionsTableHead sortingOrder={sortingOrderDeferred} setSortingOrder={setSortingOrder} />
      <tbody>
        {orderSorted.map((id) => (
          <TransactionsTableRow key={id} id={id} transaction={transactions[id]} setTransactionID={handleSetID} />
        ))}
      </tbody>
    </table>
  );
};
