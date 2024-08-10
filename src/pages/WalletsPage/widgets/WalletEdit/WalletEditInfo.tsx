import { FC } from 'react';
import { EntityIcon } from 'shared/ui';
import { getStringBalance } from 'pages/WalletsPage/helpers/getStringBalance.ts';
import { WalletType } from 'store/slices/walletsSlice';
import { getWalletTypeName } from 'pages/WalletsPage/helpers/getWalletTypeName.ts';

export const WalletEditInfo: FC<{ wallet: WalletType }> = ({ wallet }) => {
  return (
    <div className="d-flex flex-column mb-4">
      {/* Тип счета */}
      <label className="form-label text-body user-select-none m-0">Тип счета</label>
      <span className="text-body" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {getWalletTypeName(wallet.type)}
      </span>

      {/* Имя счета */}
      <label className="form-label text-body user-select-none m-0 mt-3">Имя счета</label>
      <span className="text-body" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {wallet.name}
      </span>

      {/* Иконка счета */}
      <label className="form-label text-body user-select-none m-0 mt-3">Иконка</label>
      <EntityIcon iconSize="3.6rem" iconName={wallet.iconName} iconBackgroundColor={wallet.color} />

      {/* Балланс счета */}
      <label className="form-label text-body user-select-none m-0 mt-3">Сумма на счете</label>
      <span className="text-body" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {getStringBalance(wallet.balance)} ₽
      </span>

      {/* Описание счета */}
      <label className="form-label text-body user-select-none m-0 mt-3">Описание</label>
      <span className="text-body" style={{ fontSize: '1.08rem' }}>
        {wallet.description ? wallet.description : 'Нет описания'}
      </span>
    </div>
  );
};
