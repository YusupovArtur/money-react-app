import { Dispatch, FC, ReactNode, useReducer } from 'react';
import {
  DatePickerReducerAction,
  datePickerStateReducer,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/datePickerStateReducer.ts';
import { DateStateRangeType, DateStateType, isDateState, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { useContextFactory } from 'shared/hooks/useContextFactory.tsx';

export type DatePickerState = {
  calendarState: Omit<DateStateType, 'day'>;
  calendarLevel: keyof DateStateType;
  rangeLevel: keyof DateStateType;
  isRange: boolean;
};

interface DatePickerContextProps {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerReducerAction>;
}

const { Context, useMyContext: useDatePickerContext } = useContextFactory<DatePickerContextProps>('useDatePickerContext');
export { useDatePickerContext };

// Provider
interface ProviderProps {
  children: ReactNode;
  initialDateState: DateStateType | DateStateRangeType;
}

export const DatePickerContextProvider: FC<ProviderProps> = ({ children, initialDateState }) => {
  const dateState = isDateState(initialDateState) ? initialDateState : initialDateState[1];

  const initialState: DatePickerState = {
    calendarLevel: 'day',
    calendarState: {
      month: dateState.month || new Date().getMonth() + 1,
      year: dateState.year || new Date().getFullYear(),
    },
    rangeLevel: 'day',
    isRange: isDateStateRange(initialDateState),
  };

  const [state, dispatchDatePicker] = useReducer(datePickerStateReducer, initialState);
  return <Context.Provider value={{ state: state, dispatch: dispatchDatePicker }}>{children}</Context.Provider>;
};
