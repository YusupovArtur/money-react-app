import { FC, useState } from 'react';
// Wallet components
import { ArrowLeftRightIcon, PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';
import WalletInput from 'pages/WalletsPage/widgets/WalletInput/WalletInput.tsx';
import WalletsList from 'pages/WalletsPage/widgets/WalletsList/WalletsList.tsx';
// Transaction components
import TransactionInput from 'pages/TransactionsPage/widgets/TransactionsInput/TransactionInput.tsx';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIcon, EditWindowPlaceholder } from 'shared/ui';
import WalletEdit from 'pages/WalletsPage/widgets/WalletEdit/WalletEdit.tsx';
import { useSearchParams } from 'react-router-dom';
import { WalletType } from 'store/slices/walletsSlice';
import { WalletsFilter } from 'pages/WalletsPage/features/WalletsFilter.tsx';
import { useAppSelector } from 'store/store.ts';
import { WalletsPagePlaceholder } from 'pages/WalletsPage/ui/WalletsPagePlaceholder.tsx';

export const WalletsPage: FC = () => {
  const [filter, setFilter] = useState<WalletType['type'] | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
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
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between mb-2">
          <ButtonWithIcon caption="Перевод" onClick={() => setIsOpenedTransactionInput(true)} className="btn-primary">
            <ArrowLeftRightIcon iconSize="1.2rem" />
          </ButtonWithIcon>
          <ButtonWithIcon caption="Счет" onClick={() => setIsOpenedWalletInput(true)} className="btn-primary">
            <PlusIconSVG iconSize="1.4rem" />
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
