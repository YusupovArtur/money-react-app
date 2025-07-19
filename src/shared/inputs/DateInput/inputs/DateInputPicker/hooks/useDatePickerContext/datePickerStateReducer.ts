import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DatePickerState } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

export type DatePickerReducerAction =
  | { type: 'incrementCalendarState' | 'decrementCalendarState' }
  | { type: 'setCalendarLevel'; payload: keyof DateStateType }
  | { type: 'setCalendarState'; payload: Partial<Omit<DateStateType, 'day'>> }
  | { type: 'choseMonthCalendarLevel' }
  | { type: 'choseYearCalendarLevel' }
  | { type: 'setRangeLevel'; payload: keyof DateStateType };

export const datePickerStateReducer = (state: DatePickerState, action: DatePickerReducerAction): DatePickerState => {
  const { year, month } = state.calendarState;

  switch (action.type) {
    case 'setCalendarLevel':
      if (state.rangeLevel === 'day') {
        return { ...state, calendarLevel: action.payload };
      }
      if (state.rangeLevel === 'month' && action.payload !== 'day') {
        return { ...state, calendarLevel: action.payload };
      }
      if (state.rangeLevel === 'year') {
        return { ...state, calendarLevel: 'year' };
      }
      return state;

    case 'setCalendarState':
      return {
        ...state,
        calendarState: {
          month: action.payload.month !== undefined ? action.payload.month : state.calendarState.month,
          year: action.payload.year !== undefined ? action.payload.year : state.calendarState.year,
        },
      };

    case 'incrementCalendarState':
      if (state.calendarLevel === 'day') {
        if (year <= MAX_YEAR) {
          if (month === 12) {
            if (year < MAX_YEAR) {
              return { ...state, calendarState: { month: 1, year: state.calendarState.year + 1 } };
            }
          } else {
            return { ...state, calendarState: { ...state.calendarState, month: state.calendarState.month + 1 } };
          }
        }
      } else if (year < MAX_YEAR) {
        return { ...state, calendarState: { ...state.calendarState, year: state.calendarState.year + 1 } };
      }
      return state;

    case 'decrementCalendarState':
      if (state.calendarLevel === 'day') {
        if (year >= MIN_YEAR) {
          if (month === 1) {
            if (year > MIN_YEAR) {
              return { ...state, calendarState: { month: 12, year: state.calendarState.year - 1 } };
            }
          } else {
            return { ...state, calendarState: { ...state.calendarState, month: state.calendarState.month - 1 } };
          }
        }
      } else {
        if (year > MIN_YEAR) {
          return { ...state, calendarState: { ...state.calendarState, year: state.calendarState.year - 1 } };
        }
      }
      return state;

    case 'choseMonthCalendarLevel':
      if (state.rangeLevel === 'year') {
        return { ...state, calendarLevel: 'year' };
      }
      if (state.calendarLevel === 'month' && state.rangeLevel === 'day') {
        return { ...state, calendarLevel: 'day' };
      }
      return { ...state, calendarLevel: 'month' };

    case 'choseYearCalendarLevel':
      if (state.calendarLevel === 'year') {
        if (state.rangeLevel === 'month') {
          return { ...state, calendarLevel: 'month' };
        }
        if (state.rangeLevel === 'day') {
          return { ...state, calendarLevel: 'day' };
        }
      }
      return { ...state, calendarLevel: 'year' };

    case 'setRangeLevel':
      return { ...state, calendarLevel: action.payload, rangeLevel: action.payload };

    default:
      return state;
  }
};
