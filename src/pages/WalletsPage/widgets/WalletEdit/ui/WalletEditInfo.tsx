import { FC } from 'react';
import { EntityFieldLabel, EntityFieldValue, EntityIcon } from 'shared/ui';
import { getStringBalance } from 'pages/WalletsPage/helpers/getStringBalance.ts';
import { WalletType } from 'store/slices/walletsSlice';
import { getWalletTypeName } from 'pages/WalletsPage/helpers/getWalletTypeName.ts';
import { WalletTypeIcon } from 'pages/WalletsPage/ui/WalletTypeIcon.tsx';

export const WalletEditInfo: FC<{ wallet: WalletType }> = ({ wallet }) => {
  return (
    <div className="d-flex flex-column mx-2 mb-4">
      {/* Тип счета */}
      <EntityFieldLabel>Тип счета</EntityFieldLabel>
      <div className="d-flex align-items-center">
        <WalletTypeIcon type={wallet.type} />
        <EntityFieldValue className="ms-2">{getWalletTypeName(wallet.type)}</EntityFieldValue>
      </div>

      {/* Имя счета */}
      <EntityFieldLabel className="mt-3">Имя счета</EntityFieldLabel>
      <EntityFieldValue>{wallet.name ? wallet.name : 'Нет имени'}</EntityFieldValue>

      {/* Иконка счета */}
      <EntityFieldLabel className="mt-3">Иконка</EntityFieldLabel>
      <EntityIcon iconSize="3.5rem" iconName={wallet.iconName} iconBackgroundColor={wallet.color} />

      {/* Балланс счета */}
      <EntityFieldLabel className="mt-3">Сумма на счете</EntityFieldLabel>
      <EntityFieldValue>{`${getStringBalance(wallet.balance)} ₽`}</EntityFieldValue>

      {/* Описание счета */}
      {wallet.description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{wallet.description ? wallet.description : 'Нет описания'}</EntityFieldValue>
        </>
      )}
    </div>
  );
};
