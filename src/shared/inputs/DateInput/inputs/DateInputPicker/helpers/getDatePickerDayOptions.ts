import { DatePickerDayCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';

const MS_IN_DAY = 86400000;

interface DatePickerDayOptions {
  (props: { dateState: DateStateType; calendarState: Omit<DateStateType, 'day'> }): DatePickerDayCellProps[][];
}

export const getDatePickerDayOptions: DatePickerDayOptions = (props) => {
  const {
    dateState,
    calendarState: { month, year },
  } = props;
  const today = new DateUTC(getTodayTimestamp());
  const selectedTimestamp = getTimestampFromDateState(dateState);

  const options: DatePickerDayCellProps[][] = [];

  const firstOfMonth = new DateUTC(new Date(Date.UTC(year, month - 1, 1)).getTime());
  const daysFromPrevMonth = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1;
  const firstVisibleTimestamp = firstOfMonth.timestamp - daysFromPrevMonth * MS_IN_DAY;

  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    const week: DatePickerDayCellProps[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentTimestamp = firstVisibleTimestamp + (weekIndex * 7 + dayIndex) * MS_IN_DAY;
      const currentDate = new DateUTC(currentTimestamp);

      week.push({
        timestamp: currentTimestamp,
        date: currentDate.getDate(),
        isInCurrentMonth: currentDate.getMonth() === month - 1,
        isSelected: selectedTimestamp === currentTimestamp,
        isCurrent:
          today.getDate() === currentDate.getDate() &&
          today.getMonth() === currentDate.getMonth() &&
          today.getFullYear() === currentDate.getFullYear(),
      });
    }

    options.push(week);
  }

  return options;
};
