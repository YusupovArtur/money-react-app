import { FC, useState } from 'react';
import { PlusIcon } from 'shared/icons';
import { TransactionInput } from 'widgets/TransactionsInput/TransactionInput.tsx';

export const TransactionInputWidget: FC = () => {
  const [isOpenedTransactionInput, setIsOpenedTransactionInput] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpenedTransactionInput(true)}
        className="btn btn-primary position-fixed rounded-circle p-2"
        style={{ right: '2rem', bottom: '2rem' }}
      >
        <PlusIcon iconSize="3rem" />
      </button>

      <TransactionInput type={null} isOpened={isOpenedTransactionInput} setIsOpened={setIsOpenedTransactionInput} />
    </>
  );
};
