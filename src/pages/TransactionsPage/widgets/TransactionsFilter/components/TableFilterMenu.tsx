import { Dispatch, ReactNode, SetStateAction } from 'react';
// Helpers
import { getFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getFilterOptionsList.ts';
// Components
import { SortingOrderInput } from './SortingOrderInput.tsx';
import { TableFilterOptionsMenu } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableFilterOptionsMenu.tsx';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableHeadCellButton.tsx';
import { DropdownContainer } from 'shared/containers';
// UI
import { DropdownMenuWrapper } from 'shared/ui';
// Types
import { TransactionsSortingOrderType } from '../types/TransactionsSortingOrderType.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsFilter/hooks/useSetFilter.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';

interface TableFilterMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  order: string[];
  list: TransactionsListType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: FilterDispatcherType<T>;
}

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

export const TableFilterMenu = <T extends keyof TransactionType>({
  fieldKey,
  order,
  list,
  sortingOrder,
  setSortingOrder,
  filter,
  setFilter,
}: TableFilterMenuProps<T>): ReactNode => {
  const options = getFilterOptionsList({ key: fieldKey, order: order, list: list });

  return (
    <DropdownContainer
      isInsideClickClose={false}
      isModalForMobileDevice={true}
      DropdownToggle={<TableHeadCellButton caption={captions[fieldKey]} fieldKey={fieldKey} sortingOrder={sortingOrder} />}
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          <SortingOrderInput fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          <TableFilterOptionsMenu
            fieldKey={fieldKey}
            options={options.options}
            optionKeys={options.optionKeys}
            filter={filter}
            setFilter={setFilter}
          ></TableFilterOptionsMenu>
        </DropdownMenuWrapper>
      }
    />
  );
};
