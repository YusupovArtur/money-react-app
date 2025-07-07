import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { FilterEmptyIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/FilterEmptyIcon.tsx';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getCurrentFilter.ts';
import { FilterFillIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/FilterFillIcon.tsx';

interface FilterIconProps {
  iconSize?: `${number}rem`;
  fieldKey: keyof TransactionType;
  filter: TransactionsFilterType<keyof TransactionType>;
  defaultIcon?: boolean;
}

export const FilterIcon: FC<FilterIconProps> = ({ iconSize = '0.7rem', fieldKey, filter, defaultIcon = false }) => {
  const currentFilter = getCurrentFilter({ fieldKey, filter });

  if (currentFilter.filter === null) {
    if (defaultIcon) {
      return <FilterEmptyIcon iconSize={iconSize} />;
    } else {
      return null;
    }
  }

  return <FilterFillIcon iconSize={iconSize} />;
};
