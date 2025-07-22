import { FC, useDeferredValue, useMemo, useState } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
// Components
import { PieChart } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/PieChart.tsx';
import { PieChartFilteringMenu } from 'pages/MainPage/widgets/PieChartWidget/components/PieChartFilteringMenu/PieChartFilteringMenu.tsx';
import { ChartWidgetResults } from 'pages/MainPage/widgets/PieChartWidget/components/ChartWidgetResults.tsx';
// Helpers
import { getPieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/helpers/getPieChartData.ts';
import { getFiltrationCalculationsObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFiltrationCalculationsObject.ts';
import { getFilteredTransactionsOrder } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFilteredTransactionsOrder.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { getInitialPieChartTimeFilter } from 'pages/MainPage/widgets/PieChartWidget/helpers/getInitialPieChartTimeFilter.ts';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
// Hooks
import { TransactionsSortingContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsSortingContext.ts';
import { TransactionsFilteringContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsFilteringContext.ts';

interface ChartWidgetProps {}

export const PieChartWidget: FC<ChartWidgetProps> = () => {
  const transactions = useAppSelector((state) => state.transactions.list);

  const [filters, setFilters] = useState<TransactionsFilterType<keyof TransactionType>[]>([
    { key: 'time', filter: getInitialPieChartTimeFilter('month') },
  ]);
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
      <ChartWidgetResults filter={getCurrentFilter({ fieldKey: 'time', filters: filters })} result={result} />

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
        <div style={{ width: '100%', maxWidth: '35rem', aspectRatio: '1 / 1' }}>
          <PieChart data={incomesData} colorMode={'greens'} />
        </div>
        <div style={{ width: '100%', maxWidth: '35rem', aspectRatio: '1 / 1' }}>
          <PieChart data={expensesData} colorMode={'reds'} />
        </div>
      </div>
    </div>
  );
};
