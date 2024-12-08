import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { SortingIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/SortingIcon.tsx';

interface TableHeadCellButtonProps {
  caption: string;
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
}

export const TableHeadCellButton: FC<TableHeadCellButtonProps> = ({ caption, fieldKey, sortingOrder }) => {
  return (
    <button
      className="btn btn-body-tertiary w-100 overflow-hidden d-flex justify-content-center align-items-center"
      style={{ padding: '7px 5px', textOverflow: 'ellipsis', fontWeight: 700 }}
    >
      <span>{caption}</span>
      <div className="d-flex align-items-center" style={{ marginLeft: '0.05rem' }}>
        <SortingIcon fieldKey={fieldKey} sortingOrder={sortingOrder} />
      </div>
    </button>
  );
};
