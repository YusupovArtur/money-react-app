import { FC, useState } from 'react';
// Components
import { TransactionsTable } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTable.tsx';
import { TransactionInput } from 'pages/TransactionsPage/widgets/TransactionsInput/TransactionInput.tsx';
import { TransactionEdit } from 'pages/TransactionsPage/widgets/TransactionEdit/TransactionEdit.tsx';
// UI
import { EditWindowPlaceholder, PageContentWrapper } from 'shared/ui';
import { PlusIcon } from 'shared/icons';
// Hooks
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
import { TransactionsPagePlaceholder } from 'pages/TransactionsPage/ui/TransactionsPagePlaceholder.tsx';

export const TransactionsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('transactionID');

  const [isOpenedTransactionInput, setIsOpenedTransactionInput] = useState<boolean>(false);

  const isLoading = useAppSelector((state) => state.transactions.responseState.isLoading);

  // if (isLoading !== false) {
  //   if (id === null) {
  //     return <TransactionsPagePlaceholder />;
  //   } else {
  //     return (
  //       <>
  //         <TransactionsPagePlaceholder />
  //         <EditWindowPlaceholder />
  //       </>
  //     );
  //   }
  // }

  return (
    <>
      <PageContentWrapper style={{ maxWidth: '100%', margin: '0 auto' }}>
        <TransactionsTable />
      </PageContentWrapper>

      <button
        onClick={() => setIsOpenedTransactionInput(true)}
        className="btn btn-primary position-fixed rounded-circle p-2"
        style={{ right: '2rem', bottom: '2rem' }}
      >
        <PlusIcon iconSize="3rem" />
      </button>

      {id !== null && <TransactionEdit />}
      <TransactionInput type={null} isOpened={isOpenedTransactionInput} setIsOpened={setIsOpenedTransactionInput} />
    </>
  );
};
