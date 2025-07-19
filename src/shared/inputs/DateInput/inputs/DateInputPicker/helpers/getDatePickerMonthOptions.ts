import { DatePickerMonthCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { MONTH_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateRangeType, DateStateType, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';
import { getMonthDateStateRange } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateRange.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';

export const getDatePickerMonthOptions = (props: {
  calendarState: Omit<DateStateType, 'day'>;
  dateState: DateStateType | DateStateRangeType;
}): DatePickerMonthCellProps[][] => {
  const {
    dateState,
    calendarState: { month: calendarStateMonth, year: calendarStateYear },
  } = props;

  const options: DatePickerMonthCellProps[][] = [];
  const today = new DateUTC(getTodayTimestamp());

  const isRange = isDateStateRange(dateState);

  for (let i = 0; i < 4; i++) {
    const monthsRow: DatePickerMonthCellProps[] = [];
    for (let j = 0; j < 3; j++) {
      const month_order = i * 3 + j;

      if (!isRange) {
        monthsRow.push({
          month: month_order + 1,
          shortName: MONTH_SHORT_NAMES[month_order],
          isSelectedByCalendarState: month_order + 1 === calendarStateMonth,
          isToday: today.getMonth() === month_order && today.getFullYear() === calendarStateYear,

          isBetween: false,
          isLeft: false,
          isRight: false,
        });
      }

      if (isRange) {
        const currentTimestamp = getTimestampFromDateState({ day: 1, month: month_order + 1, year: calendarStateYear });
        const month1Timestamp = getTimestampFromDateState(getMonthDateStateRange(dateState[1])[1]);
        const month2Timestamp = getTimestampFromDateState(getMonthDateStateRange(dateState[2])[1]);

        const isSelected = currentTimestamp === month1Timestamp || currentTimestamp === month2Timestamp;
        const isBetween =
          month1Timestamp <= currentTimestamp && month2Timestamp >= currentTimestamp && month1Timestamp !== month2Timestamp;

        monthsRow.push({
          month: month_order + 1,
          shortName: MONTH_SHORT_NAMES[month_order],
          isSelectedByCalendarState: isSelected,
          isToday: today.getMonth() === month_order && today.getFullYear() === calendarStateYear,

          isBetween: isBetween,
          isLeft: !isNaN(month1Timestamp) && !isNaN(month2Timestamp) && month1Timestamp === currentTimestamp && isBetween,
          isRight: !isNaN(month1Timestamp) && !isNaN(month2Timestamp) && month2Timestamp === currentTimestamp && isBetween,
        });
      }
    }
    options.push(monthsRow);
  }

  return options;
};
