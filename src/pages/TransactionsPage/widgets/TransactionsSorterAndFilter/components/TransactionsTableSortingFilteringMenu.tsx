import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// Helpers
import { getTransactionsFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getTransactionsFilterOptionsList.ts';
// Components
import { TransactionsTableSortingMenu } from './TransactionsTableSortingMenu.tsx';
import { TransactionsTableFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableFilteringMenu.tsx';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TableHeadCellButton.tsx';
import { DropdownContainer } from 'shared/containers';
// UI
import { DropdownMenuWrapper } from 'shared/ui';
// Types
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
import { TransactionsListType, TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';

interface TransactionsTableSortingFilteringMenu<T extends keyof TransactionType> {
  fieldKey: T;

  transactions: TransactionsListType;
  transactionsOrder: string[];

  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;

  filter: TransactionsFilterType<T>;
  filterDispatch: FilterDispatcherType<T>;
  filtersLength?: number;
  filtrationOrder?: number;

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
  transactions,
  transactionsOrder,
  sortingOrder,
  setSortingOrder,
  filter,
  filterDispatch,
  filtersLength,
  filtrationOrder,
  DropdownToggle,
}: TransactionsTableSortingFilteringMenu<T>): ReactNode => {
  const options = getTransactionsFilterOptionsList({ fieldKey: fieldKey, order: transactionsOrder, list: transactions });

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
          <TableHeadCellButton
            caption={captions[fieldKey]}
            fieldKey={fieldKey}
            sortingOrder={sortingOrder}
            filter={filter}
            filtrationOrder={filtersLength && filtersLength > 1 ? filtrationOrder : undefined}
          />
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
            filterDispatch={filterDispatch}
            filtersLength={filtersLength}
            portalContainerForInternalDropdowns={portalContainer}
          ></TransactionsTableFilteringMenu>
        </DropdownMenuWrapper>
      }
    />
  );
};
