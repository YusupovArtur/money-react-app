import { FC, useEffect } from 'react';
import { useAppSelector } from 'store';
import { ButtonWithIcon, DropdownMenuWrapper, EntityIcon } from 'shared/ui';
import { DropdownContainer } from 'shared/containers';
import './style/dropdown-option-item.scss';

export const WalletIDInput: FC<{
  walletID: string | undefined;
  setWalletID: (walletID: string) => any;
  firstSelectedWalletID?: string;
}> = ({ walletID, setWalletID, firstSelectedWalletID }) => {
  const wallets = useAppSelector((state) => state.wallets.list);
  const walletsOrder = useAppSelector((state) => state.wallets.order);
  const wallet = walletID ? wallets[walletID] : undefined;

  const selectedIconSize = '2rem';
  const optionIconSize = '2rem';

  useEffect(() => {
    if (firstSelectedWalletID === walletID) {
      setWalletID('');
    }
  }, [firstSelectedWalletID]);

  return (
    <DropdownContainer
      menuAlignment={{ x: 'right', y: 'bottom' }}
      isModalForMobileDevice={true}
      DropdownToggle={
        <ButtonWithIcon caption={wallet ? wallet.name : 'Счет не выбран'} className="btn-body-tertiary dropdown-toggle">
          {wallet ? (
            <EntityIcon iconName={wallet.iconName} iconBackgroundColor={wallet.color} iconSize={selectedIconSize} />
          ) : null}
        </ButtonWithIcon>
      }
      DropdownMenu={
        <DropdownMenuWrapper className="px-0">
          {walletsOrder
            .filter((optionWalletID) => optionWalletID !== firstSelectedWalletID)
            .map((optionWalletID) => (
              <button
                key={optionWalletID}
                onClick={() => {
                  setWalletID(optionWalletID);
                }}
                className={`dropdown-option-item ${optionWalletID === walletID ? 'active' : ''}`}
              >
                <EntityIcon
                  iconName={wallets[optionWalletID].iconName}
                  iconBackgroundColor={wallets[optionWalletID].color}
                  iconSize={optionIconSize}
                />
                <span className="ms-1">{wallets[optionWalletID].name}</span>
              </button>
            ))}
        </DropdownMenuWrapper>
      }
    />
  );
};
