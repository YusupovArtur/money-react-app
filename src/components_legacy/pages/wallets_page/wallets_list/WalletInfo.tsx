import { FC } from 'react';
import ContentIcon from '../../../small_components/icons_svg/icon_sets/ContentIconSets';
import { getStringSum, getWalletTypeName } from '../../../pages/wallets_page/functions';
import { walletType } from 'store/types';

const WalletInfo: FC<{ wallet: walletType }> = ({ wallet }) => {
  const iconSize: number = 2.5;

  return (
    <div className="d-flex flex-column">
      {/* Имя счета */}
      <span className="text-body-tertiary mt-2">Имя счета</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {wallet.name}
      </span>

      {/* Иконка счета */}
      <span className="text-body-tertiary mt-2">Иконка</span>
      <div className="d-flex justify-content-start align-items-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ backgroundColor: wallet.color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
        >
          <ContentIcon iconName={wallet.iconName} iconSize={`${iconSize}rem`}></ContentIcon>
        </div>
      </div>

      {/* Балланс счета */}
      <span className="text-body-tertiary mt-2">Сумма на счете</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {getStringSum(wallet.balance)} ₽
      </span>

      {/* Тип счета */}
      <span className="text-body-tertiary mt-2">Тип счета</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {getWalletTypeName(wallet.type)}
      </span>

      {/* Описание счета */}
      <span className="text-body-tertiary mt-2">Описание</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem' }}>
        {wallet.description ? wallet.description : 'Нет описания'}
      </span>
    </div>
  );
};

export default WalletInfo;
