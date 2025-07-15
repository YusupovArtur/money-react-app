import { FC } from 'react';
// Components
import { TransactionsTable } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTable.tsx';
import { TransactionEdit } from 'pages/TransactionsPage/widgets/TransactionEdit/TransactionEdit.tsx';
// UI
import { EditWindowPlaceholder, PageContentWrapper } from 'shared/ui';
// Hooks
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
import { TransactionsPagePlaceholder } from 'pages/TransactionsPage/ui/TransactionsPagePlaceholder.tsx';
import { TransactionInputWidget } from 'widgets/TransactionsInput';

export const TransactionsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('transactionID');

  const isLoading = useAppSelector((state) => state.transactions.responseState.isLoading);

  if (isLoading !== false) {
    if (id === null) {
      return <TransactionsPagePlaceholder />;
    } else {
      return (
        <>
          <TransactionsPagePlaceholder />
          <EditWindowPlaceholder />
        </>
      );
    }
  }

  return (
    <>
      <PageContentWrapper style={{ maxWidth: '100%', margin: '0 auto' }}>
        <TransactionsTable />
      </PageContentWrapper>

      {id !== null && <TransactionEdit />}
      <TransactionInputWidget />
    </>
  );
};
