import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateUTC } from 'shared/helpers';
import { RangeType } from 'shared/types';

export const getDateStateFromTimestamp = (timestamp: number): DateStateType => {
  if (isNaN(timestamp)) {
    return { day: 0, month: 0, year: 0 };
  }

  const date = new DateUTC(timestamp);

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const getDateStateRangeFromTimestampRange = (timestampRange: RangeType<number>): DateStateRangeType => {
  return { 1: getDateStateFromTimestamp(timestampRange[1]), 2: getDateStateFromTimestamp(timestampRange[2]) };
};
