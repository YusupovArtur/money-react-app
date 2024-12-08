import { FC } from 'react';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ArrowUpIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/ArrowUpIcon.tsx';
import { ArrowDownIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/ArrowDownIcon.tsx';
import { DashIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/DashIcon.tsx';

interface SortingIconProps {
  iconSize?: `${number}rem`;
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  defaultIcon?: boolean;
}

export const SortingIcon: FC<SortingIconProps> = ({ iconSize = '0.7rem', fieldKey, sortingOrder, defaultIcon = false }) => {
  if (fieldKey !== sortingOrder.key) {
    if (defaultIcon) {
      return <DashIcon iconSize={iconSize} />;
    } else {
      return null;
    }
  }

  if (sortingOrder.order === 'asc') {
    return <ArrowUpIcon iconSize={iconSize} />;
  } else {
    return <ArrowDownIcon iconSize={iconSize} />;
  }
};
