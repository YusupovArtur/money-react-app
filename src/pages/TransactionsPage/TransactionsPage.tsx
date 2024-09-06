import { FC, useState } from 'react';
import { TransactionsTable } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTable.tsx';
import { PageContentWrapper } from 'shared/ui';
import { PlusIcon } from 'shared/icons';
import { TransactionInput } from 'pages/TransactionsPage/widgets/TransactionsInput/TransactionInput.tsx';
import { TransactionEdit } from 'pages/TransactionsPage/widgets/TransactionEdit/TransactionEdit.tsx';
import { useSearchParams } from 'react-router-dom';

export const TransactionsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('transactionID');

  const [isOpenedTransactionInput, setIsOpenedTransactionInput] = useState<boolean>(false);

  return (
    <>
      <PageContentWrapper style={{ maxWidth: '100vw', margin: '0 auto', overflow: 'hidden' }}>
        <TransactionsTable />
      </PageContentWrapper>

      <button
        onClick={() => setIsOpenedTransactionInput(true)}
        className="btn btn-primary position-absolute rounded-circle p-2"
        style={{ right: '2rem', bottom: '2rem' }}
      >
        <PlusIcon iconSize="2.2rem" />
      </button>

      {id !== null && <TransactionEdit />}
      <TransactionInput type={null} isOpened={isOpenedTransactionInput} setIsOpened={setIsOpenedTransactionInput} />
    </>
  );
};
