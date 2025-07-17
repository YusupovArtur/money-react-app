import { DatePickerMonthCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { MONTH_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getDatePickerMonthOptions = (props: { calendarState: Omit<DateStateType, 'day'> }): DatePickerMonthCellProps[][] => {
  const {
    calendarState: { month, year },
  } = props;

  const options: DatePickerMonthCellProps[][] = [];
  const presentDay = new Date();

  for (let i = 0; i < 4; i++) {
    const monthsRow: DatePickerMonthCellProps[] = [];
    for (let j = 0; j < 3; j++) {
      const order = i * 3 + j;
      monthsRow.push({
        month: order + 1,
        shortName: MONTH_SHORT_NAMES[order],
        isSelected: order + 1 === month,
        isCurrent: presentDay.getMonth() === order && presentDay.getFullYear() === year,
      });
    }
    options.push(monthsRow);
  }

  return options;
};
