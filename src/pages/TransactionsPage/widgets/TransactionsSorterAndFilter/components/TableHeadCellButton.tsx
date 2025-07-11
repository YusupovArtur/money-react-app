import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
import { SortingIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/SortingIcon.tsx';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterIcon.tsx';

interface TableHeadCellButtonProps {
  caption: string;
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  filter: TransactionsFilterType<keyof TransactionType>;
}

// @ts-ignore
export const TableHeadCellButton: FC<TableHeadCellButtonProps> = ({ caption, fieldKey, sortingOrder, filter }) => {
  return (
    <button
      className="btn btn-body-tertiary w-100 overflow-hidden d-flex justify-content-center align-items-center"
      style={{ padding: '7px 2px', textOverflow: 'ellipsis', fontWeight: 700 }}
    >
      <span className="overflow-hidden text-truncate">{caption}</span>
      <div className="d-flex align-items-center" style={{ marginLeft: '0.05rem' }}>
        <SortingIcon fieldKey={fieldKey} sortingOrder={sortingOrder} />
        <FilterIcon fieldKey={fieldKey} filter={filter} />
      </div>
    </button>
  );
};
