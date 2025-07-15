import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { useAppSelector } from 'store/store.ts';
import { WalletType } from 'store/slices/walletsSlice';
// Wallet
import { WalletEdit } from './widgets/WalletEdit/WalletEdit.tsx';
import { WalletInput } from './widgets/WalletInput/WalletInput.tsx';
import { WalletsList } from './widgets/WalletsList/WalletsList.tsx';
import { WalletsFilter } from './features/WalletsFilter.tsx';
// Transaction
import { TransactionInput } from 'widgets/TransactionsInput';
// UI
import { ButtonWithIcon, EditWindowPlaceholder, PageContentWrapper } from 'shared/ui';
import { WalletsPagePlaceholder } from 'pages/WalletsPage/ui/WalletsPagePlaceholder.tsx';
import { ArrowLeftRightIcon, PlusIcon } from 'shared/icons';

export const WalletsPage: FC = () => {
  const [filter, setFilter] = useState<WalletType['type'] | null>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('walletID');

  const [isOpenedWalletInput, setIsOpenedWalletInput] = useState<boolean>(false);
  const [isOpenedTransactionInput, setIsOpenedTransactionInput] = useState<boolean>(false);

  const isLoading = useAppSelector((state) => state.wallets.responseState.isLoading);

  if (isLoading !== false) {
    if (id === null) {
      return <WalletsPagePlaceholder />;
    } else {
      return (
        <>
          <WalletsPagePlaceholder />
          <EditWindowPlaceholder />
        </>
      );
    }
  }

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }}>
        <div className="d-flex justify-content-between mb-2">
          <ButtonWithIcon caption="Перевод" onClick={() => setIsOpenedTransactionInput(true)} className="btn-primary">
            <ArrowLeftRightIcon iconSize="1.2rem" />
          </ButtonWithIcon>
          <ButtonWithIcon caption="Счет" onClick={() => setIsOpenedWalletInput(true)} className="btn-primary">
            <PlusIcon iconSize="1.4rem" />
          </ButtonWithIcon>
        </div>
        <div className="mb-2">
          <WalletsFilter filter={filter} setFilter={setFilter} />
        </div>

        <WalletsList filter={filter} />
      </PageContentWrapper>

      {id !== null && <WalletEdit />}
      <WalletInput isOpened={isOpenedWalletInput} setIsOpened={setIsOpenedWalletInput} />
      <TransactionInput isOpened={isOpenedTransactionInput} setIsOpened={setIsOpenedTransactionInput} type="transfer" />
    </>
  );
};
