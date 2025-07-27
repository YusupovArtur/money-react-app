import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';
import { ButtonWithIcon } from 'shared/ui';
import { SortingIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/SortingIcon.tsx';

interface TransactionsTableSortingMenuProps {
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
}

export const SortingMenu: FC<TransactionsTableSortingMenuProps> = ({ fieldKey, sortingOrder, setSortingOrder }) => {
  const handleSetOrder = () => {
    if (sortingOrder.key !== fieldKey) {
      setSortingOrder({ key: fieldKey, order: 'desc' });
    } else {
      setSortingOrder((state) => {
        return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' };
      });
    }
  };

  return (
    <ButtonWithIcon className="btn btn-body mb-3" caption="Сортировать" onClick={handleSetOrder}>
      <SortingIcon fieldKey={fieldKey} sortingOrder={sortingOrder} iconSize="1rem" isIconForSetSortingOrderButton={true} />
    </ButtonWithIcon>
  );
};
