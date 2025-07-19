import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getMonthMaxDay } from 'shared/inputs/DateInput/helpers/getMonthMaxDay.ts';

export const getMonthDateStateRange = (dateState: DateStateType): DateStateRangeType => {
  const { month, year } = dateState;

  return {
    1: { day: 1, month: month, year: year },
    2: { day: getMonthMaxDay({ month: month, year: year }), month: month, year: year },
  };
};
