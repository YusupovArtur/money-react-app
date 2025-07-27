import { Dispatch, SetStateAction } from 'react';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { deepEqual } from 'shared/helpers';
import {
  getTimestampFromDateState,
  getTimestampRangeFromDateStateRange,
} from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getValidDateStateRange } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';
import { getMonthProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerMonthsProps.ts';
import { getYearProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerYearsProps.ts';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';

export type DateStateDispatcherAction =
  | { type: 'clear' }
  | { type: 'setDay'; payload: DateStateType }
  | { type: 'setMonth'; payload: Omit<DateStateType, 'day'> & { day: 1 } }
  | { type: 'setYear'; payload: Omit<DateStateType, 'day' | 'month'> & { day: 1; month: 1 } };

type PropsType =
  | { setDateState: Dispatch<SetStateAction<DateStateType>>; setDateStateRange?: never }
  | { setDateState?: never; setDateStateRange: Dispatch<SetStateAction<DateStateRangeType>> };

export const useDateStateDispatcher = (props: PropsType): ((action: DateStateDispatcherAction) => void) => {
  const { setDateState, setDateStateRange } = props;

  const defaultValue = { day: 0, month: 0, year: 0 };

  return (action: DateStateDispatcherAction) => {
    switch (action.type) {
      case 'clear':
        if (setDateState) setDateState(defaultValue);
        if (setDateStateRange) setDateStateRange({ 1: defaultValue, 2: defaultValue });
        break;

      case 'setDay':
        if (setDateState) {
          setDateState((state) => {
            if (deepEqual(state, action.payload)) {
              return defaultValue;
            }
            return action.payload;
          });
        }

        if (setDateStateRange) {
          setDateStateRange((state) => {
            const validRange = getValidDateStateRange(state);
            const timestampRange = getTimestampRangeFromDateStateRange(validRange);

            if (isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              return { 1: action.payload, 2: action.payload };
            }

            if (!isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              if (deepEqual(validRange[1], action.payload)) {
                return { 1: defaultValue, 2: defaultValue };
              } else {
                return getValidDateStateRange({ 1: validRange[1], 2: action.payload });
              }
            }

            if (isNaN(timestampRange[1]) && !isNaN(timestampRange[2])) {
              if (deepEqual(validRange[2], action.payload)) {
                return { 1: defaultValue, 2: defaultValue };
              } else {
                return getValidDateStateRange({ 1: validRange[2], 2: action.payload });
              }
            }

            if (deepEqual(validRange[1], validRange[2]) && !deepEqual(validRange[1], action.payload)) {
              return getValidDateStateRange({ 1: validRange[1], 2: action.payload });
            }

            if (deepEqual(validRange[1], validRange[2]) && deepEqual(validRange[1], action.payload)) {
              return getValidDateStateRange({ 1: defaultValue, 2: defaultValue });
            }

            if (deepEqual(validRange[1], action.payload)) {
              return { 1: defaultValue, 2: validRange[2] };
            }
            if (deepEqual(validRange[2], action.payload)) {
              return { 1: validRange[1], 2: defaultValue };
            }

            return { 1: action.payload, 2: action.payload };
          });
        }
        break;

      case 'setMonth':
        if (setDateStateRange) {
          setDateStateRange((state) => {
            const validRange = getValidDateStateRange(state);
            const timestampRange = getTimestampRangeFromDateStateRange(validRange);
            const actionTimestamp = getTimestampFromDateState(action.payload);

            if (isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              return getMonthDateStateStretched(action.payload);
            }

            if (isNaN(timestampRange[1]) || isNaN(timestampRange[2])) {
              const timestamp = !isNaN(timestampRange[1]) ? timestampRange[1] : timestampRange[2];
              const selectedTimestamp = getTimestampFromDateState(action.payload);
              if (timestamp > selectedTimestamp) {
                return { 1: action.payload, 2: getDateStateFromTimestamp(timestamp) };
              }
              if (timestamp < selectedTimestamp) {
                return { 1: getDateStateFromTimestamp(timestamp), 2: getMonthDateStateStretched(action.payload)[2] };
              }
            }

            const month1: DateStateType = { day: 1, month: validRange[1].month, year: validRange[1].year };
            const month2: DateStateType = { day: 1, month: validRange[2].month, year: validRange[2].year };
            const isSelectedOneMonth = deepEqual(month1, month2);
            const monthProps = getMonthProps({ month: action.payload.month, year: action.payload.year, dateState: state });

            if (deepEqual(month1, action.payload) && deepEqual(month2, action.payload)) {
              if (monthProps.isFullSelected) {
                return { 1: defaultValue, 2: defaultValue };
              } else {
                return getMonthDateStateStretched(action.payload);
              }
            }

            if (isSelectedOneMonth) {
              if (actionTimestamp > timestampRange[2]) {
                return { 1: validRange[1], 2: getMonthDateStateStretched(action.payload)[2] };
              }
              if (actionTimestamp < timestampRange[1]) {
                return { 1: action.payload, 2: validRange[2] };
              }
            }

            if (deepEqual(month1, action.payload) && !deepEqual(month2, action.payload)) {
              if (monthProps.isFullSelected) {
                return { 1: month2, 2: validRange[2] };
              } else {
                return { 1: action.payload, 2: validRange[2] };
              }
            }

            if (!deepEqual(month1, action.payload) && deepEqual(month2, action.payload)) {
              if (monthProps.isFullSelected) {
                return { 1: validRange[1], 2: getMonthDateStateStretched(month1)[2] };
              } else {
                return { 1: validRange[1], 2: getMonthDateStateStretched(action.payload)[2] };
              }
            }

            return getMonthDateStateStretched(action.payload);
          });
        }
        break;

      case 'setYear':
        if (setDateStateRange) {
          setDateStateRange((state) => {
            const validRange = getValidDateStateRange(state);
            const timestampRange = getTimestampRangeFromDateStateRange(validRange);
            const actionTimestamp = getTimestampFromDateState(action.payload);

            if (isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              return getYearDateStateStretched(action.payload);
            }

            if (isNaN(timestampRange[1]) || isNaN(timestampRange[2])) {
              const timestamp = !isNaN(timestampRange[1]) ? timestampRange[1] : timestampRange[2];
              const selectedTimestamp = getTimestampFromDateState(action.payload);
              if (timestamp > selectedTimestamp) {
                return { 1: action.payload, 2: getDateStateFromTimestamp(timestamp) };
              }
              if (timestamp < selectedTimestamp) {
                return { 1: getDateStateFromTimestamp(timestamp), 2: getYearDateStateStretched(action.payload)[2] };
              }
            }

            const year1: DateStateType = { day: 1, month: 1, year: validRange[1].year };
            const year2: DateStateType = { day: 1, month: 1, year: validRange[2].year };
            const isSelectedOneYear = deepEqual(year1, year2);
            const yearProps = getYearProps({ year: action.payload.year, dateState: state });

            if (deepEqual(year1, action.payload) && deepEqual(year2, action.payload)) {
              if (yearProps.isFullSelected) {
                return { 1: defaultValue, 2: defaultValue };
              } else {
                return getYearDateStateStretched(action.payload);
              }
            }

            if (isSelectedOneYear) {
              if (actionTimestamp > timestampRange[2]) {
                return { 1: validRange[1], 2: getYearDateStateStretched(action.payload)[2] };
              }
              if (actionTimestamp < timestampRange[1]) {
                return { 1: action.payload, 2: validRange[2] };
              }
            }

            if (deepEqual(year1, action.payload) && !deepEqual(year2, action.payload)) {
              if (yearProps.isFullSelected) {
                return { 1: year2, 2: validRange[2] };
              } else {
                return { 1: action.payload, 2: validRange[2] };
              }
            }

            if (!deepEqual(year1, action.payload) && deepEqual(year2, action.payload)) {
              if (yearProps.isFullSelected) {
                return { 1: validRange[1], 2: getYearDateStateStretched(year1)[2] };
              } else {
                return { 1: validRange[1], 2: getYearDateStateStretched(action.payload)[2] };
              }
            }

            return getYearDateStateStretched(action.payload);
          });
        }
        break;
    }
  };
};
