import { FC } from 'react';
import { useAppSelector } from 'store/index.ts';
import { TransactionsTable } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTable.tsx';
import { PageContentWrapper } from 'shared/wrappers';

export const TransactionsPage: FC = () => {
  const operations = useAppSelector((state) => state.transactions.list);

  return (
    <PageContentWrapper style={{ maxWidth: '100vw', margin: 'auto' }}>
      <TransactionsTable operations={operations} />
    </PageContentWrapper>
  );
};
