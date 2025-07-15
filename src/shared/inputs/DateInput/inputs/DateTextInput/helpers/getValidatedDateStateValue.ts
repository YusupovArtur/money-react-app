import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { clamp } from 'shared/helpers';

const getMonthMaxDate = (props: { month: number; year: number }): number => {
  const { month, year } = props;

  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31;
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29;
  }

  return 28;
};

export const getValidatedDateStateValue = (dateState: DateStateType): DateStateType => {
  const year = dateState.year ? clamp(dateState.year, MIN_YEAR, MAX_YEAR) : 0;
  const month = dateState.month ? clamp(dateState.month, 1, 12) : 0;
  const day = year && month && dateState.day ? clamp(dateState.day, 1, getMonthMaxDate({ month, year })) : 0;

  return {
    day: day,
    month: month,
    year: year,
  };
};
