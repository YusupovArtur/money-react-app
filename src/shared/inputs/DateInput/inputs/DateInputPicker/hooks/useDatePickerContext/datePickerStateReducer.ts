import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DatePickerState } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/DatePickerStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';

export type DatePickerReducerAction =
  | { type: 'incrementCalendarState' | 'decrementCalendarState' }
  | { type: 'setCalendarLevel'; payload: keyof DateStateType }
  | { type: 'setCalendarState'; payload: Partial<Omit<DateStateType, 'day'>> }
  | { type: 'choseMonthCalendarLevel' }
  | { type: 'choseYearCalendarLevel' };

export const datePickerStateReducer = (state: DatePickerState, action: DatePickerReducerAction): DatePickerState => {
  const { year, month } = state.calendarState;

  switch (action.type) {
    case 'setCalendarLevel':
      return { ...state, calendarLevel: action.payload };

    case 'setCalendarState':
      return { ...state, calendarState: { ...state.calendarState, ...action.payload } };

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
      if (state.calendarLevel === 'month') {
        return { ...state, calendarLevel: 'day' };
      }
      return { ...state, calendarLevel: 'month' };

    case 'choseYearCalendarLevel':
      if (state.calendarLevel === 'year') {
        return { ...state, calendarLevel: 'day' };
      }
      return { ...state, calendarLevel: 'year' };

    default:
      return state;
  }
};
