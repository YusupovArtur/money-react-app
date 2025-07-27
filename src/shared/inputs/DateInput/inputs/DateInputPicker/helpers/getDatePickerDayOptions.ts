import { DatePickerDayCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import {
  getTimestampFromDateState,
  getTimestampRangeFromDateStateRange,
} from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
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

  const firstDateOfMonth = new DateUTC(new Date(Date.UTC(year, month - 1, 1)).getTime());
  const daysFromPrevMonth = firstDateOfMonth.getDay() === 0 ? 6 : firstDateOfMonth.getDay() - 1;
  const firstVisibleTimestamp = firstDateOfMonth.timestamp - daysFromPrevMonth * MS_IN_DAY;

  const options: DatePickerDayCellProps[][] = [];

  if (isDateState(dateState)) {
    const selectedTimestamp = getTimestampFromDateState(getValidDateState(dateState));

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
          isToday:
            today.getDate() === currentDate.getDate() &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear(),
          isBetween: false,
          isLeft: false,
          isRight: false,
        });
      }
      options.push(week);
    }
  } else {
    const { 1: selectedTimestamp1, 2: selectedTimestamp2 } = getTimestampRangeFromDateStateRange(
      getValidDateStateRange(dateState),
    );

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
          isBetween:
            !(isNaN(selectedTimestamp1) && isNaN(selectedTimestamp2)) &&
            (isNaN(selectedTimestamp1) ? -Infinity : selectedTimestamp1) <= currentTimestamp &&
            (isNaN(selectedTimestamp2) ? Infinity : selectedTimestamp2) >= currentTimestamp,
          isLeft: !isNaN(selectedTimestamp1) && !isNaN(selectedTimestamp2) && selectedTimestamp1 === currentTimestamp,
          isRight: !isNaN(selectedTimestamp1) && !isNaN(selectedTimestamp2) && selectedTimestamp2 === currentTimestamp,
        });
      }
      options.push(week);
    }
  }

  return options;
};
