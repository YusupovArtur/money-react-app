import { DatePickerDayCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';
import {
  getValidDateState,
  getValidDateStateRange,
} from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';

const MS_IN_DAY = 86400000;

interface DatePickerDayOptions {
  (props: {
    dateState: DateStateType | DateStateRangeType;
    calendarState: Omit<DateStateType, 'day'>;
  }): DatePickerDayCellProps[][];
}

export const getDatePickerDayOptions: DatePickerDayOptions = (props) => {
  const {
    dateState,
    calendarState: { month, year },
  } = props;
  const today = new DateUTC(getTodayTimestamp());

  const validDateState = isDateState(dateState) ? getValidDateState(dateState) : getValidDateStateRange(dateState);
  const selectedTimestamp1 = getTimestampFromDateState(isDateState(validDateState) ? validDateState : validDateState[1]);
  const selectedTimestamp2 = isDateState(validDateState) ? NaN : getTimestampFromDateState(validDateState[2]);

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
        isSelected: selectedTimestamp1 === currentTimestamp || selectedTimestamp2 === currentTimestamp,
        isToday:
          today.getDate() === currentDate.getDate() &&
          today.getMonth() === currentDate.getMonth() &&
          today.getFullYear() === currentDate.getFullYear(),
        isBetween: selectedTimestamp1 <= currentTimestamp && selectedTimestamp2 >= currentTimestamp,
        isLeft: !isNaN(selectedTimestamp1) && !isNaN(selectedTimestamp2) && selectedTimestamp1 === currentTimestamp,
        isRight: !isNaN(selectedTimestamp1) && !isNaN(selectedTimestamp2) && selectedTimestamp2 === currentTimestamp,
      });
    }

    options.push(week);
  }

  return options;
};
