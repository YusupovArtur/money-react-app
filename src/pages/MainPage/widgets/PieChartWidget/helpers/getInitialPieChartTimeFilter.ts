import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getToday } from 'shared/helpers';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';
import { RangeType } from 'shared/types';

export const getInitialPieChartTimeFilter = (mode: Exclude<keyof DateStateType, 'day'>): RangeType => {
  if (mode === 'month') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getMonthDateStateStretched(today);

    return getTimestampRangeFromDateStateRange(month);
  }

  if (mode === 'year') {
    const today = getDateStateFromTimestamp(getToday().getTime());
    const month = getYearDateStateStretched(today);

    return getTimestampRangeFromDateStateRange(month);
  }

  return { 1: NaN, 2: NaN };
};
