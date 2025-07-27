import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { clamp } from 'shared/helpers';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getMonthMaxDay } from 'shared/inputs/DateInput/helpers/getMonthMaxDay.ts';

export const getValidDateState = (dateState: DateStateType): DateStateType => {
  const year = dateState.year ? clamp(dateState.year, MIN_YEAR, MAX_YEAR) : 0;
  const month = dateState.month ? clamp(dateState.month, 1, 12) : 0;
  const day = year && month && dateState.day ? clamp(dateState.day, 1, getMonthMaxDay({ month, year })) : dateState.day;

  return {
    day: day,
    month: month,
    year: year,
  };
};

export const getValidDateStateRange = (dateStateRange: DateStateRangeType): DateStateRangeType => {
  const validDateState: DateStateRangeType = {
    1: getValidDateState(dateStateRange[1]),
    2: getValidDateState(dateStateRange[2]),
  };

  const timestamp1 = getTimestampFromDateState(validDateState[1]);
  const timestamp2 = getTimestampFromDateState(validDateState[2]);

  if (timestamp1 > timestamp2) {
    return { 1: validDateState[2], 2: validDateState[1] };
  }

  return validDateState;
};
