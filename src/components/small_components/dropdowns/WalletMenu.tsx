import React, { useEffect } from 'react';
import { useAppSelector } from 'store/hook';
import { walletType } from 'store/types';
import ContentIcon from 'components/small_components/icons_svg/icon_sets/ContentIconSets';

const WalletMenu: React.FC<{
  wallet: walletType | undefined;
  setWallet: React.Dispatch<React.SetStateAction<walletType | undefined>>;
  setWalletIDFunction?: (walletID: string) => void;
  selectedWallet?: walletType | undefined;
}> = ({ wallet, setWallet, setWalletIDFunction, selectedWallet }) => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const bigIconSize = 1.5;
  const smallIconSize = 1.3;

  useEffect(() => {
    if (wallet && selectedWallet && wallet.id === selectedWallet.id) {
      setWallet(undefined);
      if (setWalletIDFunction) setWalletIDFunction('');
    }
  }, [selectedWallet]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-body dropdown-toggle text-body d-flex flex-row align-items-center px-3 py-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {wallet ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                backgroundColor: wallet.color,
                width: `${1.415 * bigIconSize}rem`,
                height: `${1.415 * bigIconSize}rem`,
              }}
            >
              <ContentIcon iconName={wallet.iconName} iconSize={`${bigIconSize}rem`}></ContentIcon>
            </div>
            <span className="ms-2">{wallet.name}</span>
          </>
        ) : (
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ height: `${1.415 * bigIconSize}rem` }}
          >
            Счет не выбран
          </div>
        )}
      </button>
      <ul style={{ minWidth: '4rem' }} className="dropdown-menu">
        {wallets
          .filter((wallet) => wallet.id !== selectedWallet?.id)
          .map((walletItem) => (
            <li key={walletItem.id}>
              <button
                onClick={() => {
                  setWallet(() => {
                    if (setWalletIDFunction) setWalletIDFunction(walletItem.id);
                    return walletItem;
                  });
                }}
                className={`dropdown-item ${
                  wallet ? (walletItem.id === wallet.id ? 'active' : '') : ''
                } d-flex flex-row align-items-center`}
                // walletItem.id === wallet?.id && 'active'
              >
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle"
                  style={{
                    backgroundColor: walletItem.color,
                    width: `${1.415 * smallIconSize}rem`,
                    height: `${1.415 * smallIconSize}rem`,
                  }}
                >
                  <ContentIcon iconName={walletItem.iconName} iconSize={`${smallIconSize}rem`}></ContentIcon>
                </div>
                <span className="ms-1">{walletItem.name}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WalletMenu;
