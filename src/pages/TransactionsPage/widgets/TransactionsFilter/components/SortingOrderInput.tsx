import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { ButtonWithIcon } from 'shared/ui';
import { SortingIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/SortingIcon.tsx';

interface SortingOrderInputProps {
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
}

// @ts-ignore
export const SortingOrderInput: FC<SortingOrderInputProps> = ({ fieldKey, sortingOrder, setSortingOrder }) => {
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
    <ButtonWithIcon className="btn btn-body" caption="Сортировать" onClick={handleSetOrder}>
      <SortingIcon fieldKey={fieldKey} sortingOrder={sortingOrder} iconSize="1rem" defaultIcon={true} />
    </ButtonWithIcon>
  );
};
