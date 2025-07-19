import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getMonthMaxDay } from 'shared/inputs/DateInput/helpers/getMonthMaxDay.ts';

export const getYearDateStateRange = (dateState: DateStateType): DateStateRangeType => {
  const { year } = dateState;

  return {
    1: { day: 1, month: 1, year: year },
    2: { day: getMonthMaxDay({ month: 12, year: year }), month: 12, year: year },
  };
};
