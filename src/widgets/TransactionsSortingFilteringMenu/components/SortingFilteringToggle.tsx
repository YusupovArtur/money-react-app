import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { SortingIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/SortingIcon.tsx';
import { FilterIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/FilterIcon.tsx';
import { useTransactionsSortingContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsSortingContext.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';

interface TableHeadCellButtonProps {
  fieldKey: keyof TransactionType;
}

export const SortingFilteringToggle: FC<TableHeadCellButtonProps> = ({ fieldKey }) => {
  const { sortingOrder } = useTransactionsSortingContext();
  const { currentFilters, filteringRanks, filters } = useTransactionsFilteringContext();

  return (
    <button
      className="btn btn-body-tertiary w-100 overflow-hidden d-flex justify-content-center align-items-center"
      style={{ padding: '7px 2px', textOverflow: 'ellipsis', fontWeight: 700 }}
    >
      <span className="overflow-hidden text-truncate">{captions[fieldKey]}</span>
      <div className="d-flex align-items-end" style={{ marginLeft: '0.05rem' }}>
        {sortingOrder && <SortingIcon fieldKey={fieldKey} sortingOrder={sortingOrder} />}
        <FilterIcon
          filter={currentFilters[fieldKey]}
          filtrationOrder={filters.length > 1 ? filteringRanks[fieldKey] : undefined}
        />
      </div>
    </button>
  );
};

const captions: Record<keyof TransactionType, string> = {
  time: 'Дата',
  type: 'Тип',
  sum: 'Сумма',
  fromWallet: 'Счет',
  toWallet: 'Счет',
  category: 'Категория',
  subcategory: 'Подкатегория',
  description: 'Описание',
};
