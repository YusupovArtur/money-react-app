import { FC, useState } from 'react';
import { useAppSelector } from 'store/hook';
import { walletType } from 'store/types';
// Wallet components_legacy
import { ArrowLeftRightIconSVG, PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import WalletInput from '../../pages/wallets_page/wallet_form/WalletInput';
import WalletsList from '../../pages/wallets_page/wallets_list/WalletsList';
// Transaction components_legacy
import TransactionInput from '../../pages/transactions_page/transaction_form/TransactionInput';
import { PageContentWrapper } from 'shared/wrappers';

const WalletsPage: FC = () => {
  const wallets: walletType[] = useAppSelector((state) => state.wallets.list);
  const [isShowWalletInput, setIsShowWalletInput] = useState<boolean>(false);
  const [isShowTransactionInput, setIsShowTransactionInput] = useState<boolean>(false);

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => setIsShowTransactionInput(true)}
            className="btn btn-primary d-flex justify-content-between align-items-center mb-1"
          >
            <ArrowLeftRightIconSVG iconSize="1.2rem" />
            <span className="ms-1">Перевод</span>
          </button>
          <button
            onClick={() => setIsShowWalletInput(true)}
            className="btn btn-primary d-flex justify-content-between align-items-center mb-1"
          >
            <PlusIconSVG iconSize="1.2rem" />
            <span className="ms-1">Счет</span>
          </button>
        </div>
        <WalletsList wallets={wallets} />
      </PageContentWrapper>

      <WalletInput isShowInput={isShowWalletInput} setIsShowInput={setIsShowWalletInput} />
      <TransactionInput isShowInput={isShowTransactionInput} setIsShowInput={setIsShowTransactionInput} type="transfer" />
    </>
  );
};

export default WalletsPage;
