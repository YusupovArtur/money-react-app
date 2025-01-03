import { FC } from 'react';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
import { WalletType } from 'store/slices/walletsSlice';
import { getWalletTypeName } from 'pages/WalletsPage/helpers/getWalletTypeName.ts';
import { WalletTypeIcon } from 'pages/WalletsPage/ui/WalletTypeIcon.tsx';
import { EntityIcon } from 'entities/EntityIcon';
import { getStringCurrencyValue } from 'shared/helpers';

export const WalletEditInfo: FC<{ wallet: WalletType }> = ({ wallet }) => {
  const balanceColor = wallet.balance < 0 ? 'text-danger' : '';

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
      <EntityIcon iconSize="3.5rem" iconName={wallet.iconName} color={wallet.color} />

      {/* Балланс счета */}
      <EntityFieldLabel className="mt-3">Сумма на счете</EntityFieldLabel>
      <EntityFieldValue className={balanceColor}>{getStringCurrencyValue({ value: wallet.balance })}</EntityFieldValue>

      {/* Описание счета */}
      {wallet.description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{wallet.description}</EntityFieldValue>
        </>
      )}
    </div>
  );
};
