import { FC } from 'react';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getRangeFilterFromFilter.ts';
import { getPieChartResults } from 'pages/MainPage/widgets/PieChartWidget/helpers/getPieChartResults.ts';
import { getStringCurrencyValue } from 'shared/helpers';
import { useAppSelector } from 'store/store.ts';

interface PieChartWidgetResultsProps {
  result: number;
  timeFilter: TransactionsFilterType<'time'>;
}

export const PieChartWidgetResults: FC<PieChartWidgetResultsProps> = ({ result, timeFilter }) => {
  const rangeFilter = getRangeFilterFromFilter({ fieldKey: 'time', filter: timeFilter });
  const dateLabel = getPieChartResults({
    timestampRange: { 1: rangeFilter.min, 2: rangeFilter.max },
    rangeLevel: 'year',
  });

  const resultLabel = getStringCurrencyValue({
    value: result,
    sign: result > 0 ? 'positive' : result < 0 ? 'negative' : undefined,
  });
  const resultColor = result > 0 ? 'text-success' : result < 0 ? 'text-danger' : 'text-body';

  const isLoadingCategories = useAppSelector((state) => state.categories.responseState.isLoading);
  const isLoadingTransactions = useAppSelector((state) => state.transactions.responseState.isLoading);
  const isLoading = isLoadingCategories !== false || isLoadingTransactions !== false;

  return (
    <div style={{ maxWidth: '43rem' }} className="d-flex align-items-center mx-auto mb-2">
      {isLoading ? (
        <span style={{ height: '1.6506rem' }} className="placeholder col-12"></span>
      ) : (
        <>
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }} className="me-2">
            {dateLabel}
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }} className={resultColor}>
            {resultLabel}
          </span>
        </>
      )}
    </div>
  );
};
