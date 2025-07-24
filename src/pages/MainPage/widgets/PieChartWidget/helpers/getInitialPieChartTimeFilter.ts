import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { RangeFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { getToday } from 'shared/helpers';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';
import { getMonthDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateRange.ts';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateRange.ts';

export const getInitialPieChartTimeFilter = (mode: Exclude<keyof DateStateType, 'day'>): RangeFilterType => {
  if (mode === 'month') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getMonthDateStateRange(today);
    const timestampRange = getTimestampRangeFromDateStateRange(month);

    return { min: timestampRange[1], max: timestampRange[2] };
  }

  if (mode === 'year') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getYearDateStateRange(today);
    const timestampRange = getTimestampRangeFromDateStateRange(month);

    return { min: timestampRange[1], max: timestampRange[2] };
  }

  return { min: NaN, max: NaN };
};
