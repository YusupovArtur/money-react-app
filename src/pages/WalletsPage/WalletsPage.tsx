import { FC, useState } from 'react';
// Wallet components_legacy
import { ArrowLeftRightIconSVG, PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';
import WalletInput from 'pages/WalletsPage/widgets/WalletInput/WalletInput.tsx';
import WalletsList from 'pages/WalletsPage/widgets/WalletsList/WalletsList.tsx';
// Transaction components_legacy
import TransactionInput from 'pages/TransactionsPage/widgets/TransactionsInput/TransactionInput.tsx';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIcon } from 'shared/ui';
import WalletEdit from 'pages/WalletsPage/widgets/WalletEdit/WalletEdit.tsx';
import { useSearchParams } from 'react-router-dom';

export const WalletsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [isOpenedWalletInput, setIsOpenedWalletInput] = useState<boolean>(false);
  const [isOpenedTransactionInput, setIsOpenedTransactionInput] = useState<boolean>(false);

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between mb-1">
          <ButtonWithIcon caption="Перевод" onClick={() => setIsOpenedTransactionInput(true)} className="btn-primary">
            <ArrowLeftRightIconSVG iconSize="1.2rem" />
          </ButtonWithIcon>
          <ButtonWithIcon caption="Счет" onClick={() => setIsOpenedWalletInput(true)} className="btn-primary">
            <PlusIconSVG iconSize="1.4rem" />
          </ButtonWithIcon>
        </div>

        <WalletsList />
      </PageContentWrapper>

      {id !== null && <WalletEdit />}
      <WalletInput isOpened={isOpenedWalletInput} setIsOpened={setIsOpenedWalletInput} />
      <TransactionInput isOpened={isOpenedTransactionInput} setIsOpened={setIsOpenedTransactionInput} type="transfer" />
    </>
  );
};
