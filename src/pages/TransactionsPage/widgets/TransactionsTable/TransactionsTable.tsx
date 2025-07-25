import { FC, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { useAppSelector } from 'store/store.ts';
// Hooks
import { useFilterDispatch } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterDispatch.ts';
import { TransactionsSortingContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsSortingContext.ts';
import { TransactionsFilteringContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsFilteringContext.ts';
// Components
import { TransactionsTableRow } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableRow.tsx';
import { TransactionsTableHead } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsTableHead.tsx';
import { useMediaQuery } from 'shared/hooks';
// Helpers
import { getSortedTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getSortedTransactionsOrder.ts';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsSortingOrderType.ts';
// Types
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
// Style
import './style/transactions-table.scss';
import { SMALL_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { TransactionsListItem } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsListItem.tsx';
import { TransactionsListHead } from 'pages/TransactionsPage/widgets/TransactionsTable/TransactionsListHead.tsx';
import { AlertMessage } from 'shared/ui';
import { getFiltrationCalculationsObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFiltrationCalculationsObject.ts';

export const TransactionsTable: FC = () => {
  const transactions = useAppSelector((state) => state.transactions.list);
  const order = useMemo(() => Object.keys(transactions), [transactions]);

  const [sortingOrder, setSortingOrder] = useState<TransactionsSortingOrderType>({ key: 'time', order: 'desc' });
  const sortingOrderDeferred = useDeferredValue(sortingOrder);

  const [filters, setFilters] = useState<TransactionsFilterType<keyof TransactionType>[]>([]);
  const filtersDeferred = useDeferredValue<TransactionsFilterType<keyof TransactionType>[]>(filters);

  // Filtering
  const filtrationCalculationsObject = useMemo(() => {
    return getFiltrationCalculationsObject({ list: transactions, order: order, filters: filtersDeferred });
  }, [transactions, order, filtersDeferred]);

  // Sorting
  const orderedList = useMemo(() => {
    return {
      list: transactions,
      order: filtrationCalculationsObject.filteredOrder,
    };
  }, [transactions, filtrationCalculationsObject]);
  const orderSorted = useMemo(() => {
    return getSortedTransactionsOrder({
      orderedList: orderedList,
      sortingOrder: sortingOrderDeferred,
    });
  }, [orderedList, sortingOrderDeferred]);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetID = (id: string) => {
    searchParams.set('transactionID', id);
    setSearchParams(searchParams);
  };

  const isSmall = useMediaQuery(SMALL_WINDOW_MEDIA_QUERY);
  useEffect(() => {
    if (isSmall) {
      const walletReducer = useFilterDispatch({ fieldKey: 'subcategory', setFilters: setFilters });
      walletReducer({ type: 'delete' });
      const subcategoryReducer = useFilterDispatch({ fieldKey: 'subcategory', setFilters: setFilters });
      subcategoryReducer({ type: 'delete' });
    }
  }, [isSmall]);
  const errorMessage = useAppSelector((state) => state.transactions.responseState.errorMessage);

  return (
    <>
      {/*Desktop table*/}
      {!isSmall && (
        <table className="transactions-table table-hover">
          <TransactionsFilteringContext.Provider
            value={{ transactions: transactions, filters: filters, setFilters: setFilters, ...filtrationCalculationsObject }}
          >
            <TransactionsSortingContext.Provider value={{ sortingOrder: sortingOrder, setSortingOrder: setSortingOrder }}>
              <TransactionsTableHead />
            </TransactionsSortingContext.Provider>
          </TransactionsFilteringContext.Provider>
          <tbody>
            {orderSorted.map((id) => (
              <TransactionsTableRow key={id} id={id} transaction={transactions[id]} setTransactionID={handleSetID} />
            ))}
          </tbody>
        </table>
      )}

      {/*Mobile list*/}
      {isSmall && (
        <>
          <TransactionsFilteringContext.Provider
            value={{ transactions: transactions, filters: filters, setFilters: setFilters, ...filtrationCalculationsObject }}
          >
            <TransactionsSortingContext.Provider value={{ sortingOrder: sortingOrder, setSortingOrder: setSortingOrder }}>
              <TransactionsListHead />
            </TransactionsSortingContext.Provider>
          </TransactionsFilteringContext.Provider>
          {orderSorted.map((id) => (
            <TransactionsListItem key={id} id={id} transaction={transactions[id]} setTransactionID={handleSetID} />
          ))}
        </>
      )}

      {errorMessage && <AlertMessage alertMessage={errorMessage} className="alert-danger mt-4" />}
    </>
  );
};
