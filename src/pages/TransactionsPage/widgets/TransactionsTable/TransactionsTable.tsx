import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import { useSearchParams } from 'react-router-dom';
import { TransactionsTableRow } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableRow.tsx';
import './style/transactions-table.scss';
import { TransactionsTableHead } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableHead.tsx';

interface TransactionsTableProps {}

export const TransactionsTable: FC<TransactionsTableProps> = () => {
  const transactions = useAppSelector((state) => state.transactions.list);
  const order = Object.keys(transactions).sort((a, b) => transactions[a].sum - transactions[b].sum);

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
      <TransactionsTableHead />
      <tbody>
        {order.map((id) => (
          <TransactionsTableRow key={id} id={id} transaction={transactions[id]} setTransactionID={handleSetID} />
        ))}
      </tbody>
    </table>
  );
};
