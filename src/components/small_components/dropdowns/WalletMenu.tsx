import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import { walletType } from 'store/types';
import ContentIcon from 'components/small_components/icons_svg/icon_sets/ContentIconSets';

const WalletMenu: React.FC<{ walletID: string; setWalletID: (walletID: string) => void }> = ({ walletID, setWalletID }) => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const [wallet, setWallet] = useState<walletType | undefined>(wallets.find((wallet) => walletID === wallet.id));

  useEffect(() => {
    if (wallet && walletID !== wallet.id && !walletID) {
      setWallet(undefined);
    }
  }, [walletID]);

  const bigIconSize = 1.5;
  const smallIconSize = 1.3;

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
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            <button
              onClick={() => {
                setWalletID(wallet.id);
                setWallet(wallet);
              }}
              className={`dropdown-item ${wallet.id === walletID && 'active'} d-flex flex-row align-items-center`}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: wallet.color,
                  width: `${1.415 * smallIconSize}rem`,
                  height: `${1.415 * smallIconSize}rem`,
                }}
              >
                <ContentIcon iconName={wallet.iconName} iconSize={`${smallIconSize}rem`}></ContentIcon>
              </div>
              <span className="ms-1">{wallet.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletMenu;
