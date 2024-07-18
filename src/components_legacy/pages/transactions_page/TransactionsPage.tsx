import { FC } from 'react';
import { useAppSelector } from 'store/hook';
import OperationsTable from '../../pages/transactions_page/OperationsTable';

function TransactionsPage(): React.ReactElement {
  const operations = useAppSelector((state) => state.operations.list);

  return <OperationsTable operations={operations}></OperationsTable>;
}

export default TransactionsPage;
