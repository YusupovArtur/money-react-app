import { CSSProperties, FC } from 'react';
// Wallet components_legacy
import { EntityIcon } from 'shared/ui';
import { getStringBalance } from '../../helpers/getStringBalance.ts';
import { useAppSelector } from 'store/store.ts';
import { useSearchParams } from 'react-router-dom';

interface WalletItemProps {
  id: string;
  style?: CSSProperties;
}

const WalletsListItem: FC<WalletItemProps> = ({ id, style }) => {
  const wallet = useAppSelector((state) => state.wallets.list[id]);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetId = () => {
    searchParams.set('id', id);
    setSearchParams(searchParams);
  };

  if (!wallet) {
    return null;
  }

  return (
    <div
      onClick={handleSetId}
      style={style}
      className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-1"
    >
      <div className="d-flex align-items-center">
        <EntityIcon iconName={wallet.iconName} iconBackgroundColor={wallet.color} iconSize="2.2rem" />
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {wallet.name}
        </span>
      </div>
      <div className="d-flex align-items-center">
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
          {getStringBalance(wallet.balance)} ₽
        </span>
      </div>
    </div>
  );
};

export default WalletsListItem;
