import { DragEventHandler, FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import { selectDisplayedWallet } from 'store/slices/walletsSlice';
import { selectWalletTransactionsTotal } from 'store/slices/transactionsSlice';
import { EntityIcon } from 'entities/EntityIcon';
import { getStringCurrencyValue } from 'shared/helpers';
import { CaretDownFillIcon } from 'shared/icons';
import { selectBodyTertiaryBackgroundColor } from 'store/slices/themeSlice';

interface WalletWidgetItemInfoProps {
  id: string;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
  isLoading: boolean;
}

export const WalletWidgetItemInfo: FC<WalletWidgetItemInfoProps> = ({ id, onDragStart, onDrop, isLoading }) => {
  const wallet = useAppSelector(selectDisplayedWallet(id));

  const totalBalance = useAppSelector(selectWalletTransactionsTotal(id));
  const balance = wallet.balance + totalBalance;
  const balanceColor = balance < 0 ? 'text-danger' : '';

  const bodyColor = useAppSelector(selectBodyTertiaryBackgroundColor);
  const color = id ? wallet.color : bodyColor;

  return (
    <div draggable={!isLoading} onDragStart={onDragStart} onDrop={onDrop}>
      <button
        disabled={isLoading}
        className="d-flex align-items-center btn btn-body-tertiary"
        style={{ width: 'fit-content', height: 'fit-content' }}
      >
        <div className="d-flex flex-column me-1">
          <div className="d-flex align-items-center">
            <EntityIcon iconName={wallet.iconName} color={color} iconSize="1.5rem" />
            <span className="ms-1">{wallet.name}</span>
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }} className={`align-self-end ${balanceColor}`}>
            {getStringCurrencyValue({ value: balance })}
          </span>
        </div>
        <CaretDownFillIcon iconSize="0.6rem" />
      </button>
    </div>
  );
};
