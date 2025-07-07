import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
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
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsFilter/hooks/useSetFilter.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { useAppSelector } from 'store/store.ts';

interface TableSortingFilteringMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
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

export const TableSortingFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  sortingOrder,
  setSortingOrder,
  filter,
  setFilter,
}: TableSortingFilteringMenuProps<T>): ReactNode => {
  const list = useAppSelector((state) => state.transactions.list);
  const order = Object.keys(list);
  const options = getFilterOptionsList({ fieldKey: fieldKey, order: order, list: list });

  const divRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (divRef.current) {
      setPortalContainer(divRef.current);
    }
  }, []);

  return (
    <DropdownContainer
      isInsideClickClose={false}
      isModalForMobileDevice={true}
      toggleRef={divRef}
      DropdownToggle={
        <TableHeadCellButton caption={captions[fieldKey]} fieldKey={fieldKey} sortingOrder={sortingOrder} filter={filter} />
      }
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          <SortingOrderInput fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          <TableFilterOptionsMenu
            fieldKey={fieldKey}
            options={options.options}
            optionKeys={options.optionKeys}
            filter={filter}
            setFilter={setFilter}
            portalContainerForInternalDropdowns={portalContainer}
          ></TableFilterOptionsMenu>
        </DropdownMenuWrapper>
      }
    />
  );
};
