import { FC } from 'react';
import { useAppSelector } from 'store';
import { OperationsTable } from '../../pages/transactions_page/OperationsTable';
import { PageContentWrapper } from 'shared/wrappers';

const TransactionsPage: FC = () => {
  const operations = useAppSelector((state) => state.transactions.list);

  return (
    <PageContentWrapper style={{ maxWidth: '100vw', margin: 'auto' }}>
      <OperationsTable operations={operations} />
    </PageContentWrapper>
  );
};

export default TransactionsPage;
