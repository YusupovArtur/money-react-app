import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DatePickerState } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

export type DatePickerReducerAction =
  | { type: 'incrementCalendarState' | 'decrementCalendarState' }
  | { type: 'setCalendarLevel'; payload: keyof DateStateType }
  | { type: 'setCalendarState'; payload: Partial<Omit<DateStateType, 'day'>> }
  | { type: 'setRangeLevel'; payload: keyof DateStateType };

export const datePickerStateReducer = (state: DatePickerState, action: DatePickerReducerAction): DatePickerState => {
  const { year, month } = state.calendarState;

  switch (action.type) {
    case 'setCalendarLevel':
      if (!state.isRange) {
        if (state.calendarLevel !== action.payload) {
          return { ...state, calendarLevel: action.payload };
        } else {
          if (action.payload === 'year') {
            return { ...state, calendarLevel: 'month' };
          }

          if (action.payload === 'month') {
            return { ...state, calendarLevel: 'day' };
          }
        }
      } else {
        if (state.rangeLevel === 'day') {
          if (state.calendarLevel !== action.payload) {
            return { ...state, calendarLevel: action.payload };
          } else {
            if (action.payload === 'month') {
              return { ...state, calendarLevel: 'day' };
            }
            if (action.payload === 'year') {
              return { ...state, calendarLevel: 'month' };
            }
          }
        }

        if (state.rangeLevel === 'month') {
          if (action.payload === 'day') {
            return state;
          } else {
            if (state.calendarLevel !== action.payload) {
              return { ...state, calendarLevel: action.payload };
            } else {
              if (action.payload === 'year') {
                return { ...state, calendarLevel: 'month' };
              }
            }
          }
        }

        if (state.rangeLevel === 'year') {
          return { ...state, calendarLevel: 'year' };
        }
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

    case 'setRangeLevel':
      return { ...state, calendarLevel: action.payload, rangeLevel: action.payload };

    default:
      return state;
  }
};
