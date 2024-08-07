import { FC, useState } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
// Wallet components_legacy
import WalletOpened from '../../../pages/wallets_page/wallets_list/WalletOpened';
import { ContentIcon } from 'shared/ui';
import { getStringSum } from '../functions';

interface WalletItemProps {
  id: string;
  wallet: WalletType;
}

const WalletItem: FC<WalletItemProps> = ({ id, wallet }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const iconSize: number = 1.5;
  return (
    <>
      <div
        id={id}
        onClick={() => setIsOpened(true)}
        className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-2"
      >
        <div id={id} className="d-flex align-items-center">
          <div
            id={id}
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ backgroundColor: wallet.color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
          >
            <ContentIcon iconName={wallet.iconName} iconSize={`${iconSize}rem`} />
          </div>
          <span id={id} className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
            {wallet.name}
          </span>
        </div>
        <div id={id} className="d-flex align-items-center">
          <span id={id} className="mx-2 text-body" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
            {getStringSum(wallet.balance)} ₽
          </span>
        </div>
      </div>

      <WalletOpened id={id} wallet={wallet} isOpened={isOpened} setIsOpened={setIsOpened} />
    </>
  );
};

export default WalletItem;
