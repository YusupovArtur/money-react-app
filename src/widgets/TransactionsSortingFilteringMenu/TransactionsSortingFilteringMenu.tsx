import { ReactNode, useEffect, useRef, useState } from 'react';
// Hooks
import { useTransactionsSortingContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsSortingContext.ts';
// Components
import { SortingMenu } from './components/SortingMenu.tsx';
import { FilteringMenu } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringMenu.tsx';
import { SortingFilteringToggle } from 'widgets/TransactionsSortingFilteringMenu/components/SortingFilteringToggle.tsx';
import { DropdownContainer } from 'shared/containers';
// UI
import { DropdownMenuWrapper } from 'shared/ui';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';

interface TransactionsSortingFilteringMenu<T extends keyof TransactionType> {
  fieldKey: T;
  DropdownToggle?: ReactNode;
}

export const TransactionsTableSortingFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  DropdownToggle,
}: TransactionsSortingFilteringMenu<T>): ReactNode => {
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
      toggleDivStyleProps={{ style: { width: '100%', height: '100%' } }}
      menuDivStyleProps={{ style: { maxHeight: '80vh', overflow: 'auto' } }}
      DropdownToggle={DropdownToggle ? DropdownToggle : <SortingFilteringToggle fieldKey={fieldKey} />}
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          {sortingOrder && setSortingOrder && (
            <SortingMenu fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          )}
          <FilteringMenu fieldKey={fieldKey} portalContainerForInternalDropdowns={portalContainer} />
        </DropdownMenuWrapper>
      }
    />
  );
};
