import { FC, useDeferredValue, useMemo } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
// Components
import { PieChart } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/PieChart.tsx';
import { PieChartFilteringMenu } from 'pages/MainPage/widgets/PieChartWidget/components/PieChartFilteringMenu/PieChartFilteringMenu.tsx';
import { PieChartWidgetResults } from 'pages/MainPage/widgets/PieChartWidget/components/PieChartWidgetResults.tsx';
// Helpers
import { getPieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/helpers/getPieChartData.ts';
import { getFiltrationCalculationsObject } from 'widgets/TransactionsSortingFilteringMenu/helpers/getFiltrationCalculationsObject.ts';
import { getFilteredTransactionsOrder } from 'widgets/TransactionsSortingFilteringMenu/helpers/getFilteredTransactionsOrder.ts';
import { getCurrentFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getCurrentFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
// Hooks
import { TransactionsSortingContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsSortingContext.ts';
import { TransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
import { useMainPagePieChartFilterContext } from 'app/hooks/useAppContext/useMainPagePieChartFilterContext.tsx';

export const PieChartWidget: FC = () => {
  const transactions = useAppSelector((state) => state.transactions.list);

  const { filters, setFilters } = useMainPagePieChartFilterContext();
  const filtersDeferred = useDeferredValue<TransactionsFilterType<keyof TransactionType>[]>(filters);

  const { filtrationCalculationsObject, expensesData, incomesData, result } = useMemo(() => {
    const orderWithoutTransfers = getFilteredTransactionsOrder({
      list: transactions,
      order: Object.keys(transactions),
      filter: { key: 'type', filter: new Set<TransactionType['type']>(['transfer']) },
    });
    const filtrationCalculationsObject = getFiltrationCalculationsObject({
      list: transactions,
      order: orderWithoutTransfers,
      filters: filtersDeferred,
    });

    const expensesOrder = getFilteredTransactionsOrder({
      list: transactions,
      order: filtrationCalculationsObject.filteredOrder,
      filter: { key: 'type', filter: new Set<TransactionType['type']>(['income']) },
    });
    const incomesOrder = getFilteredTransactionsOrder({
      list: transactions,
      order: filtrationCalculationsObject.filteredOrder,
      filter: { key: 'type', filter: new Set<TransactionType['type']>(['expense']) },
    });
    const expensesData = getPieChartData({ order: expensesOrder, transactions: transactions });
    const incomesData = getPieChartData({ order: incomesOrder, transactions: transactions });

    const expenses = expensesData.reduce((acc, cur) => acc + cur.value, 0);
    const incomes = incomesData.reduce((acc, cur) => acc + cur.value, 0);
    const result = incomes - expenses;

    return { filtrationCalculationsObject, expensesData, incomesData, result };
  }, [transactions, filtersDeferred]);

  return (
    <div>
      {/*Results*/}
      <PieChartWidgetResults timeFilter={getCurrentFilter({ fieldKey: 'time', filters: filters })} result={result} />

      {/*Chart filtering*/}
      <TransactionsFilteringContext.Provider
        value={{ transactions: transactions, filters: filters, setFilters: setFilters, ...filtrationCalculationsObject }}
      >
        <TransactionsSortingContext.Provider value={{ sortingOrder: undefined, setSortingOrder: undefined }}>
          <PieChartFilteringMenu />
        </TransactionsSortingContext.Provider>
      </TransactionsFilteringContext.Provider>

      {/*Charts*/}
      <div className="d-flex justify-content-center align-self-center flex-wrap gap-2">
        <PieChart data={incomesData} colorMode={'greens'} />
        <PieChart data={expensesData} colorMode={'reds'} />
      </div>
    </div>
  );
};
