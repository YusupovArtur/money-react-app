import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { RangeFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { getToday } from 'shared/helpers';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';

export const getInitialPieChartTimeFilter = (mode: Exclude<keyof DateStateType, 'day'>): RangeFilterType => {
  if (mode === 'month') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getMonthDateStateStretched(today);
    const timestampRange = getTimestampRangeFromDateStateRange(month);

    return { min: timestampRange[1], max: timestampRange[2] };
  }

  if (mode === 'year') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getYearDateStateStretched(today);
    const timestampRange = getTimestampRangeFromDateStateRange(month);

    return { min: timestampRange[1], max: timestampRange[2] };
  }

  return { min: NaN, max: NaN };
};
