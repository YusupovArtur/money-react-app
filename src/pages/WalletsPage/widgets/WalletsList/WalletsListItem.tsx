import { FC } from 'react';
// Store
import { useSearchParams } from 'react-router-dom';
import { useGetWalletWithTotalBalance } from 'store/slices/walletsSlice';
// UI
import { EntityIcon } from 'entities/EntityIcon';
import { WalletTypeIcon } from 'pages/WalletsPage/ui/WalletTypeIcon.tsx';
import { getStringCurrencyValue } from 'shared/helpers';
import { ListItemFieldValue, ListItemWrapper } from 'shared/ui';

interface WalletItemProps {
  walletID: string;
  disabled?: boolean;
  loading?: boolean;
}

export const WalletsListItem: FC<WalletItemProps> = ({ walletID, disabled, loading }) => {
  // const wallet = useAppSelector(selectWalletWithTotalBalance(walletID));
  const { walletWithTotalBalance: wallet } = useGetWalletWithTotalBalance(walletID);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetID = () => {
    searchParams.set('walletID', walletID);
    setSearchParams(searchParams);
  };

  if (!wallet) {
    return null;
  }

  const balanceColor = wallet.balance < 0 ? 'text-danger' : '';

  return (
    <ListItemWrapper onClick={handleSetID} disabled={disabled} loading={loading}>
      <EntityIcon iconName={wallet.iconName} color={wallet.color} iconSize="2.2rem" />

      <ListItemFieldValue className="flex-shrink-1 ms-2" style={{ marginRight: 'auto' }}>
        {wallet.name}
      </ListItemFieldValue>

      <ListItemFieldValue className={`flex-shrink-0 mx-2 ${balanceColor}`} style={{ fontWeight: 500 }}>
        {getStringCurrencyValue({ value: wallet.balance })}
      </ListItemFieldValue>

      <WalletTypeIcon type={wallet.type} />
    </ListItemWrapper>
  );
};
