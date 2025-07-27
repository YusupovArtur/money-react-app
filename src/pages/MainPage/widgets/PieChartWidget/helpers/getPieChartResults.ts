import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MONTH_FULL_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import {
  getValidDateState,
  getValidDateStateRange,
} from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import {
  getStringDateFromDateState,
  getStringDateFromDateStateRange,
} from 'shared/inputs/DateInput/inputs/DateTextInput/helpers/getStringDateFromDateState.ts';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { deepEqual } from 'shared/helpers';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';
import { RangeType } from 'shared/types';
import {
  getDateStateFromTimestamp,
  getDateStateRangeFromTimestampRange,
} from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';

export const getPieChartResults = (props: { timestampRange: RangeType<number>; rangeLevel: keyof DateStateType }): string => {
  const { timestampRange, rangeLevel } = props;

  const validRange = getValidDateStateRange(getDateStateRangeFromTimestampRange(timestampRange));
  const validTimestampRange = getTimestampRangeFromDateStateRange(validRange);
  const timestamp1 = validTimestampRange[1];
  const timestamp2 = validTimestampRange[2];

  if (rangeLevel === 'day') {
    if (isNaN(timestamp1) && isNaN(timestamp2)) {
      return 'За все время';
    }

    if (isNaN(timestampRange[1])) {
      return `По ${getStringDateFromDateState(getValidDateState(getDateStateFromTimestamp(timestampRange[2])))}`;
    }

    if (isNaN(timestampRange[2])) {
      return `C ${getStringDateFromDateState(getValidDateState(getDateStateFromTimestamp(timestampRange[1])))}`;
    }

    if (deepEqual(timestamp1, timestamp2)) {
      return `За ${getStringDateFromDateState(validRange[1])}`;
    }

    return `${getStringDateFromDateStateRange(validRange)}`;
  }

  if (rangeLevel === 'month') {
    if (!isNaN(timestamp1) && !isNaN(timestamp2)) {
      // noinspection DuplicatedCode
      const monthRange1 = getMonthDateStateStretched(validRange[1]);
      const monthRange2 = getMonthDateStateStretched(validRange[2]);

      if (deepEqual(monthRange1, validRange)) {
        return `За ${MONTH_FULL_NAMES[validRange[1].month - 1]} ${validRange[1].year}`;
      }

      if (deepEqual(monthRange1[1], validRange[1]) && deepEqual(monthRange2[2], validRange[2])) {
        return `${getStringDateFromDateState(validRange[1]).slice(3)}-${getStringDateFromDateState(validRange[2]).slice(3)}`;
      }

      return getPieChartResults({ timestampRange: timestampRange, rangeLevel: 'day' });
    } else {
      return getPieChartResults({ timestampRange: timestampRange, rangeLevel: 'day' });
    }
  }

  if (rangeLevel === 'year') {
    if (!isNaN(timestamp1) && !isNaN(timestamp2)) {
      // noinspection DuplicatedCode
      const yearRange1 = getYearDateStateStretched(validRange[1]);
      const yearRange2 = getYearDateStateStretched(validRange[2]);

      if (deepEqual(yearRange1, validRange)) {
        return `За ${validRange[1].year}`;
      }

      if (deepEqual(yearRange1[1], validRange[1]) && deepEqual(yearRange2[2], validRange[2])) {
        return `${validRange[1].year}-${validRange[2].year}`;
      }

      return getPieChartResults({ timestampRange: timestampRange, rangeLevel: 'month' });
    } else {
      return getPieChartResults({ timestampRange: timestampRange, rangeLevel: 'month' });
    }
  }

  return '-- -- -- г';
};
