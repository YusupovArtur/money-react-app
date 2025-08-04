import { DatePickerMonthCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { MONTH_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getValidDateStateRange } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { RangeType } from 'shared/types';

export const getDatePickerMonthsProps = (props: {
  calendarState: Omit<DateStateType, 'day'>;
  dateState: DateStateType | DateStateRangeType;
}): DatePickerMonthCellProps[][] => {
  const { dateState, calendarState } = props;

  const options: DatePickerMonthCellProps[][] = [];
  const today = new DateUTC(getTodayTimestamp());

  if (isDateState(dateState)) {
    for (let i = 0; i < 4; i++) {
      const monthsRow: DatePickerMonthCellProps[] = [];
      for (let j = 0; j < 3; j++) {
        const monthOrder = i * 3 + j;

        monthsRow.push({
          month: monthOrder + 1,
          shortName: MONTH_SHORT_NAMES[monthOrder],
          isFullSelected: monthOrder + 1 === dateState.month && calendarState.year === dateState.year,
          isPartlySelected: false,
          isToday: today.getMonth() === monthOrder && today.getFullYear() === calendarState.year,

          isBetween: false,
          isLeft: false,
          isRight: false,
        });
      }
      options.push(monthsRow);
    }
  } else {
    const validDateState = getValidDateStateRange(dateState);
    const selectedTimestamps = getTimestampRangeFromDateStateRange(validDateState);

    for (let i = 0; i < 4; i++) {
      const monthsRow: DatePickerMonthCellProps[] = [];
      for (let j = 0; j < 3; j++) {
        const monthOrder = i * 3 + j;

        monthsRow.push({
          ...getMonthProps({ month: monthOrder + 1, year: calendarState.year, selectedTimestamps }),
          isToday: today.getMonth() === monthOrder && today.getFullYear() === calendarState.year,
        });
      }
      options.push(monthsRow);
    }
  }

  return options;
};

export const getMonthProps = (
  props: {
    month: number;
    year: number;
  } & (
    | {
        selectedTimestamps: RangeType;
        dateState?: never;
      }
    | { selectedTimestamps?: never; dateState: DateStateRangeType }
  ),
): Omit<DatePickerMonthCellProps, 'isToday'> => {
  const { month, year } = props;

  const selectedTimestamps = props.selectedTimestamps
    ? props.selectedTimestamps
    : getTimestampRangeFromDateStateRange(getValidDateStateRange(props.dateState));

  const selectedTimestampsInfinity = {
    1: isNaN(selectedTimestamps[1]) ? -Infinity : selectedTimestamps[1],
    2: isNaN(selectedTimestamps[2]) ? Infinity : selectedTimestamps[2],
  };

  const currentStretchedMonth = getTimestampRangeFromDateStateRange(
    getMonthDateStateStretched({
      day: 1,
      month: month,
      year: year,
    }),
  );

  const isAllNaN = isNaN(selectedTimestamps[1]) && isNaN(selectedTimestamps[2]);
  const isMonthBetweenTimestamps =
    selectedTimestampsInfinity[1] <= currentStretchedMonth[1] && selectedTimestampsInfinity[2] >= currentStretchedMonth[2];
  const isSelectedOneMonth =
    currentStretchedMonth[1] <= selectedTimestamps[1] && currentStretchedMonth[2] >= selectedTimestamps[2];

  const isFullSelected =
    isMonthBetweenTimestamps &&
    (currentStretchedMonth[1] === selectedTimestamps[1] || currentStretchedMonth[2] === selectedTimestamps[2]);

  const isPartlySelected =
    (currentStretchedMonth[1] <= selectedTimestamps[1] && currentStretchedMonth[2] >= selectedTimestamps[1]) ||
    (currentStretchedMonth[1] <= selectedTimestamps[2] && currentStretchedMonth[2] >= selectedTimestamps[2]);

  const isLeftPart =
    (isPartlySelected && isNaN(selectedTimestamps[2])) || (isPartlySelected && selectedTimestamps[2] > currentStretchedMonth[2]);
  const isRightPart =
    (isPartlySelected && isNaN(selectedTimestamps[1])) || (isPartlySelected && selectedTimestamps[1] < currentStretchedMonth[1]);

  const isBetween = !isSelectedOneMonth && !isAllNaN && (isLeftPart || isRightPart || isMonthBetweenTimestamps);

  const isLeft = !isSelectedOneMonth && (isLeftPart || (isFullSelected && currentStretchedMonth[1] === selectedTimestamps[1]));
  const isRight = !isSelectedOneMonth && (isRightPart || (isFullSelected && currentStretchedMonth[2] === selectedTimestamps[2]));

  return {
    month: month,
    shortName: MONTH_SHORT_NAMES[month - 1],
    isFullSelected: isFullSelected,
    isPartlySelected: isPartlySelected,

    isBetween: isBetween,
    isLeft: isLeft,
    isRight: isRight,
  };
};
