import { ReactNode, useEffect, useRef, useState } from 'react';
// Hooks
import { useTransactionsSortingContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsSortingContext.ts';
// Components
import { TransactionsTableSortingMenu } from './TransactionsTableSortingMenu.tsx';
import { TransactionsTableFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableFilteringMenu.tsx';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TableHeadCellButton.tsx';
import { DropdownContainer } from 'shared/containers';
// UI
import { DropdownMenuWrapper } from 'shared/ui';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';

interface TransactionsTableSortingFilteringMenu<T extends keyof TransactionType> {
  fieldKey: T;
  DropdownToggle?: ReactNode;
}

export const TransactionsTableSortingFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  DropdownToggle,
}: TransactionsTableSortingFilteringMenu<T>): ReactNode => {
  const { sortingOrder, setSortingOrder } = useTransactionsSortingContext();

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
      DropdownToggle={DropdownToggle ? DropdownToggle : <TableHeadCellButton fieldKey={fieldKey} />}
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          {sortingOrder && setSortingOrder && (
            <TransactionsTableSortingMenu fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          )}
          <TransactionsTableFilteringMenu fieldKey={fieldKey} portalContainerForInternalDropdowns={portalContainer} />
        </DropdownMenuWrapper>
      }
    />
  );
};
