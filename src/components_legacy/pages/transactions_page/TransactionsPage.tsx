import { FC } from 'react';
import { useAppSelector } from 'store/hook';
import OperationsTable from '../../pages/transactions_page/OperationsTable';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';

const TransactionsPage: FC = () => {
  const operations = useAppSelector((state) => state.operations.list);

  return (
    <PageContentWrapper style={{ maxWidth: '100vw', margin: 'auto' }}>
      <OperationsTable operations={operations} />
    </PageContentWrapper>
  );
};

export default TransactionsPage;
