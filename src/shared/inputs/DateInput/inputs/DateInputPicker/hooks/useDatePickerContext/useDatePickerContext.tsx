import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { DatePickerState } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/DatePickerStateType.ts';
import {
  DatePickerReducerAction,
  datePickerStateReducer,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/datePickerStateReducer.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

interface ContextProps {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerReducerAction>;
}

const DatePickerContext = createContext<ContextProps | undefined>(undefined);

// Provider
interface ProviderProps {
  children: ReactNode;
  initialDateState: DateStateType;
}

export const DatePickerProvider: FC<ProviderProps> = ({ children, initialDateState }) => {
  const initialState: DatePickerState = {
    calendarLevel: 'day',
    calendarState: {
      month: initialDateState.month || new Date().getMonth() + 1,
      year: initialDateState.year || new Date().getFullYear(),
    },
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
