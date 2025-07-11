import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// Helpers
import { getFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFilterOptionsList.ts';
// Components
import { TransactionsTableSortingMenu } from './TransactionsTableSortingMenu.tsx';
import { TransactionsTableFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableFilteringMenu.tsx';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TableHeadCellButton.tsx';
import { DropdownContainer } from 'shared/containers';
// UI
import { DropdownMenuWrapper } from 'shared/ui';
// Types
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { useAppSelector } from 'store/store.ts';

interface TransactionsTableSortingFilteringMenu<T extends keyof TransactionType> {
  fieldKey: T;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilterDispatcher: FilterDispatcherType<T>;
  DropdownToggle?: ReactNode;
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

export const TransactionsTableSortingFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  sortingOrder,
  setSortingOrder,
  filter,
  setFilterDispatcher,
  DropdownToggle,
}: TransactionsTableSortingFilteringMenu<T>): ReactNode => {
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
      isModalDropdownContainerForMobileDevice={true}
      toggleRef={divRef}
      dropdownDivContainerProps={{ style: { width: '100%', height: '100%' } }}
      DropdownToggle={
        DropdownToggle ? (
          DropdownToggle
        ) : (
          <TableHeadCellButton caption={captions[fieldKey]} fieldKey={fieldKey} sortingOrder={sortingOrder} filter={filter} />
        )
      }
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          <TransactionsTableSortingMenu fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          <TransactionsTableFilteringMenu
            fieldKey={fieldKey}
            options={options.options}
            optionKeys={options.optionKeys}
            filter={filter}
            setFilter={setFilterDispatcher}
            portalContainerForInternalDropdowns={portalContainer}
          ></TransactionsTableFilteringMenu>
        </DropdownMenuWrapper>
      }
    />
  );
};
