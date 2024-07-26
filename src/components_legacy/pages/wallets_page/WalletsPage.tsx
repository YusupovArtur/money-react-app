import { FC, useState } from 'react';
import { useAppSelector } from 'store/hook.ts';
import { walletType } from 'store/types';
// Wallet components_legacy
import { ArrowLeftRightIconSVG, PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import WalletInput from '../../pages/wallets_page/wallet_form/WalletInput';
import WalletsList from '../../pages/wallets_page/wallets_list/WalletsList';
// Transaction components_legacy
import TransactionInput from '../../pages/transactions_page/transaction_form/TransactionInput';

const WalletsPage: FC = () => {
  const wallets: walletType[] = useAppSelector((state) => state.wallets.list);
  const [isShowWalletInput, setIsShowWalletInput] = useState<boolean>(false);
  const [isShowTransactionInput, setIsShowTransactionInput] = useState<boolean>(false);

  return (
    <>
      <div
        style={{ maxWidth: '45rem', width: '100vw' }}
        className="align-self-start bg-body-tertiary shadow-sm px-3 pt-3 rounded-4"
      >
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => setIsShowTransactionInput(true)}
            className="btn btn-primary d-flex justify-content-between align-items-center mb-1"
          >
            <ArrowLeftRightIconSVG iconSize="1.2rem"></ArrowLeftRightIconSVG>
            <span className="ms-1">Перевод</span>
          </button>
          <button
            onClick={() => setIsShowWalletInput(true)}
            className="btn btn-primary d-flex justify-content-between align-items-center mb-1"
          >
            <PlusIconSVG iconSize="1.2rem"></PlusIconSVG>
            <span className="ms-1">Счет</span>
          </button>
        </div>
        <WalletsList wallets={wallets}></WalletsList>
      </div>

      <WalletInput isShowInput={isShowWalletInput} setIsShowInput={setIsShowWalletInput}></WalletInput>
      <TransactionInput
        isShowInput={isShowTransactionInput}
        setIsShowInput={setIsShowTransactionInput}
        type="transfer"
      ></TransactionInput>
    </>
  );
};

export default WalletsPage;
