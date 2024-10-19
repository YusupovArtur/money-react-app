import { FC } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { CashStackIcon } from './CashStackIcon.tsx';
import { PercentIcon } from './PercentIcon.tsx';
import { GraphUpArrowIcon } from './GraphUpArrowIcon.tsx';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface WalletTypeIconProps {
  type: WalletType['type'];
  iconSize?: `${number}rem`;
}

export const WalletTypeIcon: FC<WalletTypeIconProps> = ({ type, iconSize = '1.4rem' }) => {
  switch (type) {
    case 'debit':
      return <CashStackIcon iconSize={iconSize} color={COLOR_NAMES_HEX['blue-500']} />;
    case 'credit':
      return <PercentIcon iconSize={iconSize} color={COLOR_NAMES_HEX['red-500']} />;
    case 'investment':
      return <GraphUpArrowIcon iconSize={iconSize} color={COLOR_NAMES_HEX['green-500']} />;
    default:
      return null;
  }
};
