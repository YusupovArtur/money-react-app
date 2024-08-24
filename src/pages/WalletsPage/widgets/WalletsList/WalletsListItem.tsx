import { FC } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
import { useSearchParams } from 'react-router-dom';
import { EntityIcon, ListItemWrapper } from 'shared/ui';
import { getStringBalance } from 'pages/WalletsPage/helpers/getStringBalance.ts';
import { WalletTypeIcon } from 'pages/WalletsPage/ui/WalletTypeIcon.tsx';

interface WalletItemProps {
  id: string;
  disabled?: boolean;
  loading?: boolean;
}

export const WalletsListItem: FC<WalletItemProps> = ({ id, disabled, loading }) => {
  const wallet = useAppSelector((state) => state.wallets.list[id]);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetId = () => {
    searchParams.set('walletID', id);
    setSearchParams(searchParams);
  };

  if (!wallet) {
    return null;
  }

  return (
    <ListItemWrapper onClick={handleSetId} disabled={disabled} loading={loading}>
      <div className="d-flex align-items-center">
        <EntityIcon iconName={wallet.iconName} iconBackgroundColor={wallet.color} iconSize="2.2rem" />
        <span className="ms-2 text-body" style={{ fontSize: '1.05rem' }}>
          {wallet.name}
        </span>
      </div>

      <div className="d-flex align-items-center">
        <span className="me-2 text-body" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
          {getStringBalance(wallet.balance)} ₽
        </span>
        <WalletTypeIcon type={wallet.type} />
      </div>
    </ListItemWrapper>
  );
};
