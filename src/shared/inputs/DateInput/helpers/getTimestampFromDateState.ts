import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { RangeType } from 'shared/types';

export const getTimestampFromDateState = (dateState: DateStateType): number => {
  if (dateState.day && dateState.month && dateState.year) {
    return new Date(Date.UTC(dateState.year, dateState.month - 1, dateState.day)).getTime();
  }
  return NaN;
};

export const getTimestampRangeFromDateStateRange = (dateStateRange: DateStateRangeType): RangeType<number> => {
  return { 1: getTimestampFromDateState(dateStateRange[1]), 2: getTimestampFromDateState(dateStateRange[2]) };
};
