import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterEmptyIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterEmptyIcon.tsx';
import { FilterFillIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterFillIcon.tsx';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface FilterIconProps {
  iconSize?: `${number}rem`;
  filter: TransactionsFilterType<keyof TransactionType> | undefined;
  filtrationOrder?: number;
  isIconForDeleteFilterButton?: boolean;
}

export const FilterIcon: FC<FilterIconProps> = ({
  iconSize = '0.75rem',
  filter,
  filtrationOrder,
  isIconForDeleteFilterButton = false,
}) => {
  if (!filter) {
    if (isIconForDeleteFilterButton) {
      return <FilterEmptyIcon iconSize={iconSize} />;
    } else {
      return null;
    }
  } else {
    if (isIconForDeleteFilterButton) {
      return <FilterFillIcon iconSize={iconSize} color={COLOR_NAMES_HEX['red-500']} />;
    } else {
      return (
        <>
          <FilterFillIcon iconSize={iconSize} />
          {filtrationOrder && (
            <span style={{ fontSize: '0.5rem', fontWeight: 500, height: 'fit-content' }}>{filtrationOrder}</span>
          )}
        </>
      );
    }
  }
};
