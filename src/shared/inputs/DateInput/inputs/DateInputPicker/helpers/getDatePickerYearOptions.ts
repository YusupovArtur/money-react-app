import { DatePickerYearCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateRangeType, DateStateType, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateRange.ts';

export const getDatePickerYearOptions = (props: {
  calendarState: Omit<DateStateType, 'day'>;
  dateState: DateStateType | DateStateRangeType;
}): DatePickerYearCellProps[][] => {
  const dateState = props.dateState;
  const calendarStateYear = props.calendarState.year;
  const options: DatePickerYearCellProps[][] = [];

  const today = new DateUTC(getTodayTimestamp());
  const isRange = isDateStateRange(dateState);

  for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
    const row: DatePickerYearCellProps[] = [];
    for (let j = 0; j < 4; j++) {
      const year_order = MIN_YEAR + i * 4 + j;

      if (!isRange) {
        row.push({
          year: year_order,
          isSelectedByCalendarState: year_order === calendarStateYear,
          isToday: today.getFullYear() === year_order,

          isBetween: false,
          isLeft: false,
          isRight: false,
        });
      }

      if (isRange) {
        const currentTimestamp = getTimestampFromDateState({ day: 1, month: 1, year: year_order });
        const year1Timestamp = getTimestampFromDateState(getYearDateStateRange(dateState[1])[1]);
        const year2Timestamp = getTimestampFromDateState(getYearDateStateRange(dateState[2])[1]);

        const isSelected = currentTimestamp === year1Timestamp || currentTimestamp === year2Timestamp;
        const isBetween =
          year1Timestamp <= currentTimestamp && year2Timestamp >= currentTimestamp && year1Timestamp !== year2Timestamp;

        row.push({
          year: year_order,
          isSelectedByCalendarState: isSelected,
          isToday: today.getFullYear() === year_order,

          isBetween: isBetween,
          isLeft: !isNaN(year1Timestamp) && !isNaN(year2Timestamp) && year1Timestamp === currentTimestamp && isBetween,
          isRight: !isNaN(year1Timestamp) && !isNaN(year2Timestamp) && year2Timestamp === currentTimestamp && isBetween,
        });
      }
    }
    options.push(row);
  }

  return options;
};
