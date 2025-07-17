import { DatePickerYearCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getDatePickerYearOptions = (props: { calendarState: Omit<DateStateType, 'day'> }): DatePickerYearCellProps[][] => {
  const year = props.calendarState.year;
  const options: DatePickerYearCellProps[][] = [];

  for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
    const row: DatePickerYearCellProps[] = [];
    for (let j = 0; j < 4; j++) {
      const order = MIN_YEAR + i * 4 + j;
      row.push({ year: order, isSelected: order === year, isCurrent: new Date().getFullYear() === order });
    }
    options.push(row);
  }

  return options;
};
