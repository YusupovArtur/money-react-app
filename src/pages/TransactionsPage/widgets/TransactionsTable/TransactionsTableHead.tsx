import { JSX, memo, useEffect } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsTableSortingFilteringMenu.tsx';
// Helpers
import { useTransactionsFilteringContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsFilteringContext.ts';
import { useFilterDispatch } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterDispatch.ts';
// UI
import { useMediaQuery } from 'shared/hooks';
import { MEDIUM_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TRANSACTION_TABLE_PROPORTIONS } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/TRANSACTION_TABLE_PROPORTIONS.ts';

export const TransactionsTableHead = memo((): JSX.Element => {
  const { setFilters } = useTransactionsFilteringContext();

  const isMedium = useMediaQuery(MEDIUM_WINDOW_MEDIA_QUERY);
  useEffect(() => {
    if (isMedium) {
      const subcategoryReducer = useFilterDispatch({ fieldKey: 'subcategory', setFilters: setFilters });
      subcategoryReducer({ type: 'delete' });
    }
  }, [isMedium]);

  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.timeWidth, padding: 0 }}>
          <TransactionsTableSortingFilteringMenu fieldKey="time" />
        </th>

        {/*Type*/}
        <th style={{ width: TRANSACTION_TABLE_PROPORTIONS.typeWidth, padding: 0 }}>
          <TransactionsTableSortingFilteringMenu fieldKey="type" />
        </th>

        {/*Sum*/}
        <th
          colSpan={TRANSACTION_TABLE_PROPORTIONS.sumColSpan}
          style={{ width: TRANSACTION_TABLE_PROPORTIONS.sumWidth, padding: 0 }}
        >
          <TransactionsTableSortingFilteringMenu fieldKey="sum" />
        </th>

        {/*Wallets*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.walletsColSpan} style={{ padding: 0 }}>
          <TransactionsTableSortingFilteringMenu fieldKey="fromWallet" />
        </th>

        {/*Category*/}
        <th colSpan={TRANSACTION_TABLE_PROPORTIONS.categoryColSpan} style={{ padding: 0 }}>
          <TransactionsTableSortingFilteringMenu fieldKey="category" />
        </th>

        {/*Subcategory*/}
        {!isMedium && (
          <th colSpan={TRANSACTION_TABLE_PROPORTIONS.subcategoryColSpan} style={{ padding: 0 }}>
            <TransactionsTableSortingFilteringMenu fieldKey="subcategory" />
          </th>
        )}
      </tr>
    </thead>
  );
});
