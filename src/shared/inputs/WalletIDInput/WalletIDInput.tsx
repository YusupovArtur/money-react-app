import { FC, useEffect } from 'react';
import { useAppSelector } from 'store';
import { ButtonWithIcon, EntityIcon } from 'shared/ui';
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/wrappers';
import './style/dropdown_option_item_style.scss';

export const WalletIDInput: FC<{
  walletID: string | undefined;
  setWalletID: (walletID: string) => void;
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
      modalForMobileDevice={true}
      DropdownToggle={
        <ButtonWithIcon caption={wallet ? wallet.name : 'Счет не выбран'} className="btn-body dropdown-toggle">
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
