import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export type DatePickerState = {
  calendarState: Omit<DateStateType, 'day'>;
  calendarLevel: keyof DateStateType;
};
