import { FC } from 'react';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ArrowUpIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/ArrowUpIcon.tsx';
import { ArrowDownIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/ArrowDownIcon.tsx';
import { DashIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/DashIcon.tsx';

interface SortingIconProps {
  iconSize?: `${number}rem`;
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  isIconForSetSortingOrderButton?: boolean;
}

export const SortingIcon: FC<SortingIconProps> = ({
  iconSize = '0.7rem',
  fieldKey,
  sortingOrder,
  isIconForSetSortingOrderButton = false,
}) => {
  if (fieldKey !== sortingOrder.key) {
    if (isIconForSetSortingOrderButton) {
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
