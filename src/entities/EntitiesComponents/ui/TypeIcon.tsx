import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ArrowDownRightIcon } from './ArrowDownRightIcon.tsx';
import { ArrowUpRightIcon } from './ArrowUpRightIcon.tsx';
import { ArrowLeftRightIcon } from 'shared/icons';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface TransactionEntityTypeIconProps {
  type: TransactionType['type'];
  iconSize?: `${number}rem`;
}

export const TypeIcon: FC<TransactionEntityTypeIconProps> = ({ type, iconSize = '1.4rem' }) => {
  switch (type) {
    case 'expense':
      return <ArrowDownRightIcon iconSize={iconSize} color={COLOR_NAMES_HEX['red-500']} />;
    case 'income':
      return <ArrowUpRightIcon iconSize={iconSize} color={COLOR_NAMES_HEX['green-500']} />;
    case 'transfer':
      return <ArrowLeftRightIcon iconSize={iconSize} color={COLOR_NAMES_HEX['blue-500']} />;
    default:
      return null;
  }
};
