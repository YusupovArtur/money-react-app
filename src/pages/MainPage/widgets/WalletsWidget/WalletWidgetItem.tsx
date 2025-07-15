import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { selectDisplayedWallet, selectWalletsList, selectWalletsOrder } from 'store/slices/walletsSlice';
import { selectWalletTransactionsTotal } from 'store/slices/transactionsSlice';
import { getStringCurrencyValue } from 'shared/helpers';
import { IDInputDropdown, IDOptionType } from 'shared/inputs';
import { EntityIcon } from 'entities/EntityIcon';
import { CaretDownFillIcon } from 'shared/icons';
import { DropdownContainer } from 'shared/containers';
import { changeWalletsWidgetSettings } from 'store/slices/settingsSlice';

const WalletInfo: FC<{ id: string }> = ({ id }) => {
  const wallet = useAppSelector(selectDisplayedWallet(id));

  const totalBalance = useAppSelector(selectWalletTransactionsTotal(id));
  const balance = wallet.balance + totalBalance;
  const balanceColor = balance < 0 ? 'text-danger' : '';

  return (
    <div className="d-flex align-items-center btn btn-body-tertiary" style={{ width: 'fit-content', height: 'fit-content' }}>
      <div className="d-flex flex-column me-1">
        <div className="d-flex align-items-center">
          <EntityIcon iconName={wallet.iconName} color={wallet.color} iconSize="1.5rem" />
          <span className="ms-1">{wallet.name}</span>
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: 500 }} className={`align-self-end ${balanceColor}`}>
          {getStringCurrencyValue({ value: balance })}
        </span>
      </div>
      <CaretDownFillIcon iconSize="0.6rem" />
    </div>
  );
};

interface WalletWidgetItemProps {
  id: string;
  index: number;
}

export const WalletWidgetItem: FC<WalletWidgetItemProps> = ({ id, index }) => {
  const dispatch = useAppDispatch();

  const wallets = useAppSelector(selectWalletsList);
  const walletsOrder = useAppSelector(selectWalletsOrder);
  const options: IDOptionType[] = walletsOrder.map((id) => ({
    id,
    name: wallets[id].name,
    color: wallets[id].color,
    iconName: wallets[id].iconName,
  }));

  const setId = (id: string) => {
    dispatch(changeWalletsWidgetSettings({ action: { type: 'change', payload: { id: id, index: index } } }));
  };

  return (
    <DropdownContainer
      DropdownToggle={<WalletInfo id={id} />}
      DropdownMenu={<IDInputDropdown setID={setId} option={id} options={options} />}
    ></DropdownContainer>
  );
};
