import { Dispatch, SetStateAction } from 'react';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { deepEqual } from 'shared/helpers';
import {
  getTimestampFromDateState,
  getTimestampRangeFromDateStateRange,
} from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getValidDateStateRange } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { getMonthDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateRange.ts';
import { getYearDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateRange.ts';

export type DateStateDispatcherAction =
  | { type: 'clear' }
  | { type: 'setDay'; payload: DateStateType }
  | { type: 'setMonth'; payload: DateStateType }
  | { type: 'setYear'; payload: DateStateType }
  | { type: 'stretchRange'; payload: Exclude<keyof DateStateType, 'day'> };

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
              if (deepEqual(validRange['1'], action.payload)) {
                return { 1: defaultValue, 2: defaultValue };
              } else {
                return getValidDateStateRange({ 1: validRange[1], 2: action.payload });
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

            console.log('set new');
            return { 1: action.payload, 2: action.payload };
          });
        }
        break;

      case 'setMonth':
        if (setDateStateRange) {
          setDateStateRange((state) => {
            const validRange = getValidDateStateRange(state);
            const timestampRange = getTimestampRangeFromDateStateRange(validRange);

            if (isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              return getMonthDateStateRange(action.payload);
            }

            const month1: DateStateType = { day: 1, month: validRange[1].month, year: validRange[1].year };
            const month2: DateStateType = { day: 1, month: validRange[2].month, year: validRange[2].year };
            const isSelectedOneMonth = deepEqual(month1, month2);

            if (deepEqual(month1, action.payload) && deepEqual(month2, action.payload)) {
              return { 1: defaultValue, 2: defaultValue };
            }

            if (isSelectedOneMonth) {
              const month2 = getMonthDateStateRange(action.payload)[1];
              const newRange: DateStateRangeType = getValidDateStateRange({ 1: month1, 2: month2 });
              return { 1: newRange[1], 2: getMonthDateStateRange(newRange[2])[2] };
            }

            if (deepEqual(month1, action.payload) && !deepEqual(month2, action.payload)) {
              return getMonthDateStateRange(month2);
            }

            if (!deepEqual(month1, action.payload) && deepEqual(month2, action.payload)) {
              return getMonthDateStateRange(month1);
            }

            return getMonthDateStateRange(action.payload);
          });
        }
        break;

      case 'setYear':
        if (setDateStateRange) {
          setDateStateRange((state) => {
            const validRange = getValidDateStateRange(state);
            const timestampRange = getTimestampRangeFromDateStateRange(validRange);

            if (isNaN(timestampRange[1]) && isNaN(timestampRange[2])) {
              return getYearDateStateRange(action.payload);
            }

            const year1: DateStateType = { day: 1, month: 1, year: validRange[1].year };
            const year2: DateStateType = { day: 1, month: 1, year: validRange[2].year };
            const isSelectedOneYear = deepEqual(year1, year2);

            if (deepEqual(year1, action.payload) && deepEqual(year2, action.payload)) {
              return { 1: defaultValue, 2: defaultValue };
            }

            if (isSelectedOneYear) {
              const year2 = getYearDateStateRange(action.payload)[1];
              const newRange: DateStateRangeType = getValidDateStateRange({ 1: year1, 2: year2 });
              return { 1: newRange[1], 2: getYearDateStateRange(newRange[2])[2] };
            }

            if (deepEqual(year1, action.payload) && !deepEqual(year2, action.payload)) {
              return getMonthDateStateRange(year2);
            }

            if (!deepEqual(year1, action.payload) && deepEqual(year2, action.payload)) {
              return getMonthDateStateRange(year1);
            }

            return getYearDateStateRange(action.payload);
          });
        }
        break;

      case 'stretchRange':
        if (setDateStateRange) {
          setDateStateRange((state) => {
            const timestamp1 = getTimestampFromDateState(state[1]);
            const timestamp2 = getTimestampFromDateState(state[2]);

            if (!isNaN(timestamp1) && !isNaN(timestamp2)) {
              if (action.payload === 'month') {
                const validRange = getValidDateStateRange(state);
                const date1 = getMonthDateStateRange(validRange[1])[1];
                const date2 = getMonthDateStateRange(validRange[2])[2];
                return { 1: date1, 2: date2 };
              }
              if (action.payload === 'year') {
                const validRange = getValidDateStateRange(state);
                const date1 = getYearDateStateRange(validRange[1])[1];
                const date2 = getYearDateStateRange(validRange[2])[2];
                return { 1: date1, 2: date2 };
              }
            }

            return state;
          });
        }
        break;
    }
  };
};
