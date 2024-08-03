import { FC, useEffect } from 'react';
import { useAppSelector } from 'store/hook.ts';
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
  const wallet = wallets.find((wallet) => wallet.id === walletID);

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
      modalForMobileDevice={{ isEnable: true }}
      DropdownToggle={
        <ButtonWithIcon caption={wallet ? wallet.name : 'Счет не выбран'} className="btn-body dropdown-toggle">
          {wallet ? (
            <EntityIcon iconName={wallet.iconName} iconBackgroundColor={wallet.color} iconSize={selectedIconSize} />
          ) : null}
        </ButtonWithIcon>
      }
      DropdownMenu={
        <DropdownMenuWrapper className="px-0">
          {wallets
            .filter((wallet) => wallet.id !== firstSelectedWalletID)
            .map((walletOption) => (
              <button
                key={walletOption.id}
                onClick={() => {
                  setWalletID(walletOption.id);
                }}
                className={`dropdown-option-item ${walletOption.id === walletID ? 'active' : ''}`}
              >
                <EntityIcon iconName={walletOption.iconName} iconBackgroundColor={walletOption.color} iconSize={optionIconSize} />
                <span className="ms-1">{walletOption.name}</span>
              </button>
            ))}
        </DropdownMenuWrapper>
      }
    />
  );
};
