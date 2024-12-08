import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getTimestampFromDateState = (dateState: DateStateType): number => {
  if (dateState.day && dateState.month && dateState.year) {
    return new Date(Date.UTC(dateState.year, dateState.month - 1, dateState.day)).getTime();
  }
  return NaN;
};
