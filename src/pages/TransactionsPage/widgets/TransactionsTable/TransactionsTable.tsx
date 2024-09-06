import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import { getStringDate } from 'shared/helpers';
import { useSearchParams } from 'react-router-dom';

interface TransactionsTableProps {}

export const TransactionsTable: FC<TransactionsTableProps> = () => {
  const transactions = useAppSelector((state) => state.transactions.list);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetID = (id: string) => {
    searchParams.set('transactionID', id);
    setSearchParams(searchParams);
  };

  return (
    <table className="table table-bordered m-0" style={{ width: '100%', overflowY: 'hidden' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Sum</th>
          <th>Date</th>
          <th>From wallet</th>
          <th>To wallet</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(transactions)
          .sort((a, b) => transactions[a].sum - transactions[b].sum)
          .map((id) => (
            <tr
              key={id}
              onClick={() => {
                handleSetID(id);
              }}
            >
              <td>{id}</td>
              <td>{transactions[id].sum}</td>
              <td>{getStringDate(new Date(transactions[id].time))}</td>
              <td>{transactions[id].fromWallet}</td>
              <td>{transactions[id].toWallet}</td>
              <td>{transactions[id].category}</td>
              <td>{transactions[id].subcategory}</td>
              <td>{transactions[id].description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
