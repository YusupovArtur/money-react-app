import { DatePickerYearCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';
import { getTimestampRangeFromDateStateRange } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';
import { getValidDateStateRange } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { RangeType } from 'shared/types';

export const getDatePickerYearsProps = (dateState: DateStateType | DateStateRangeType): DatePickerYearCellProps[][] => {
  const options: DatePickerYearCellProps[][] = [];

  const today = new DateUTC(getTodayTimestamp());

  if (isDateState(dateState)) {
    for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
      const row: DatePickerYearCellProps[] = [];
      for (let j = 0; j < 4; j++) {
        const yearOrder = MIN_YEAR + i * 4 + j;

        row.push({
          year: yearOrder,
          isFullSelected: yearOrder === dateState.year,
          isPartlySelected: false,
          isToday: today.getFullYear() === yearOrder,

          isBetween: false,
          isLeft: false,
          isRight: false,
        });
      }
      options.push(row);
    }
  } else {
    const validDateState = getValidDateStateRange(dateState);
    const selectedTimestamps = getTimestampRangeFromDateStateRange(validDateState);

    for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
      const row: DatePickerYearCellProps[] = [];
      for (let j = 0; j < 4; j++) {
        const yearOrder = MIN_YEAR + i * 4 + j;

        row.push({
          ...getYearProps({ year: yearOrder, selectedTimestamps: selectedTimestamps }),
          isToday: today.getFullYear() === yearOrder,
        });
      }
      options.push(row);
    }
  }

  return options;
};

export const getYearProps = (
  props: {
    year: number;
  } & (
    | {
        selectedTimestamps: RangeType<number>;
        dateState?: never;
      }
    | {
        selectedTimestamps?: never;
        dateState: DateStateRangeType;
      }
  ),
): Omit<DatePickerYearCellProps, 'isToday'> => {
  const { year } = props;
  const selectedTimestamps = props.selectedTimestamps
    ? props.selectedTimestamps
    : getTimestampRangeFromDateStateRange(getValidDateStateRange(props.dateState));

  const selectedTimestampsInfinity = {
    1: isNaN(selectedTimestamps[1]) ? -Infinity : selectedTimestamps[1],
    2: isNaN(selectedTimestamps[2]) ? Infinity : selectedTimestamps[2],
  };

  const currentStretchedYear = getTimestampRangeFromDateStateRange(
    getYearDateStateStretched({
      day: 1,
      month: 1,
      year: year,
    }),
  );

  const isAllNaN = isNaN(selectedTimestamps[1]) && isNaN(selectedTimestamps[2]);
  const isYearBetweenTimestamps =
    selectedTimestampsInfinity[1] <= currentStretchedYear[1] && selectedTimestampsInfinity[2] >= currentStretchedYear[2];
  const isSelectedOneYear = currentStretchedYear[1] <= selectedTimestamps[1] && currentStretchedYear[2] >= selectedTimestamps[2];

  const isFullSelected =
    isYearBetweenTimestamps &&
    (currentStretchedYear[1] === selectedTimestamps[1] || currentStretchedYear[2] === selectedTimestamps[2]);

  const isPartlySelected =
    (currentStretchedYear[1] <= selectedTimestamps[1] && currentStretchedYear[2] >= selectedTimestamps[1]) ||
    (currentStretchedYear[1] <= selectedTimestamps[2] && currentStretchedYear[2] >= selectedTimestamps[2]);

  const isLeftPart =
    (isPartlySelected && isNaN(selectedTimestamps[2])) || (isPartlySelected && selectedTimestamps[2] > currentStretchedYear[2]);
  const isRightPart =
    (isPartlySelected && isNaN(selectedTimestamps[1])) || (isPartlySelected && selectedTimestamps[1] < currentStretchedYear[1]);

  const isBetween = !isSelectedOneYear && !isAllNaN && (isLeftPart || isRightPart || isYearBetweenTimestamps);

  const isLeft = !isSelectedOneYear && (isLeftPart || (isFullSelected && currentStretchedYear[1] === selectedTimestamps[1]));
  const isRight = !isSelectedOneYear && (isRightPart || (isFullSelected && currentStretchedYear[2] === selectedTimestamps[2]));

  return {
    year: year,
    isFullSelected: isFullSelected,
    isPartlySelected: isPartlySelected,

    isBetween: isBetween,
    isLeft: isLeft,
    isRight: isRight,
  };
};
