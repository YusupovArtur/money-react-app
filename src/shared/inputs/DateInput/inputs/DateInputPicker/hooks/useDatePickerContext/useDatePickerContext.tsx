import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import {
  DatePickerReducerAction,
  datePickerStateReducer,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/datePickerStateReducer.ts';
import { DateStateRangeType, DateStateType, isDateState, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';

export type DatePickerState = {
  calendarState: Omit<DateStateType, 'day'>;
  calendarLevel: keyof DateStateType;
  rangeLevel: keyof DateStateType;
  isRange: boolean;
};

interface ContextProps {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerReducerAction>;
}

const DatePickerContext = createContext<ContextProps | undefined>(undefined);

// Provider
interface ProviderProps {
  children: ReactNode;
  initialDateState: DateStateType | DateStateRangeType;
}

export const DatePickerProvider: FC<ProviderProps> = ({ children, initialDateState }) => {
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
  return <DatePickerContext.Provider value={{ state, dispatch: dispatchDatePicker }}>{children}</DatePickerContext.Provider>;
};

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('useDatePickerContext must be used within a MyProvider');
  }
  return context;
};
