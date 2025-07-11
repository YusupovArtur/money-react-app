import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterEmptyIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterEmptyIcon.tsx';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getCurrentFilter.ts';
import { FilterFillIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterFillIcon.tsx';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface FilterIconProps {
  iconSize?: `${number}rem`;
  fieldKey: keyof TransactionType;
  filter: TransactionsFilterType<keyof TransactionType>;
  isIconForDeleteFilterButton?: boolean;
}

export const FilterIcon: FC<FilterIconProps> = ({
  iconSize = '0.7rem',
  fieldKey,
  filter,
  isIconForDeleteFilterButton = false,
}) => {
  const currentFilter = getCurrentFilter({ fieldKey, filter });

  if (currentFilter.filter === null) {
    if (isIconForDeleteFilterButton) {
      return <FilterEmptyIcon iconSize={iconSize} />;
    } else {
      return null;
    }
  } else {
    if (isIconForDeleteFilterButton) {
      return <FilterFillIcon iconSize={iconSize} color={COLOR_NAMES_HEX['red-500']} />;
    } else {
      return <FilterFillIcon iconSize={iconSize} />;
    }
  }
};
