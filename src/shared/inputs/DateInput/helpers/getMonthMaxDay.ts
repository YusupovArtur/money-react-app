import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';

export const getMonthMaxDay = (props: { month: number; year: number }): number => {
  const { month, year } = props;

  if (month < 1 || month > 12 || year < MIN_YEAR || year > MAX_YEAR) {
    return 0;
  }

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
