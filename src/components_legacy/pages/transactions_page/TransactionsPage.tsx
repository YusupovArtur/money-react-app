import { FC } from 'react';
import { useAppSelector } from 'store/hook';
import OperationsTable from '../../pages/transactions_page/OperationsTable';

const TransactionsPage: FC = () => {
  const operations = useAppSelector((state) => state.operations.list);

  return <OperationsTable operations={operations}></OperationsTable>;
};

export default TransactionsPage;
