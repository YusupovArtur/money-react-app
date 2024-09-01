import { FC } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
import { useSearchParams } from 'react-router-dom';
import { ListItemLabel, ListItemWrapper } from 'shared/ui';
import { getStringBalance } from 'pages/WalletsPage/helpers/getStringBalance.ts';
import { WalletTypeIcon } from 'pages/WalletsPage/ui/WalletTypeIcon.tsx';
import { EntityIcon } from 'entities/EntityIcon';

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
      <EntityIcon iconName={wallet.iconName} color={wallet.color} iconSize="2.2rem" />

      <ListItemLabel className="flex-shrink-1 ms-2" style={{ marginRight: 'auto' }}>
        {wallet.name}
      </ListItemLabel>

      <ListItemLabel className="flex-shrink-0 mx-2" style={{ fontWeight: 500 }}>
        {`${getStringBalance(wallet.balance)} ₽`}
      </ListItemLabel>

      <WalletTypeIcon type={wallet.type} />
    </ListItemWrapper>
  );
};
