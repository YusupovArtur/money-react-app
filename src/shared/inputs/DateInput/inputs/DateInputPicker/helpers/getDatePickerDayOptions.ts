import { DatePickerDayOptionsCellPropsType } from 'shared/inputs/DateInput/types/types.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';

export const getDatePickerDayOptions = (props: {
  dateState: DateStateType;
  displayedOption: Omit<DateStateType, 'day'>;
}): DatePickerDayOptionsCellPropsType[][] => {
  const {
    dateState,
    displayedOption: { month, year },
  } = props;

  const options: DatePickerDayOptionsCellPropsType[][] = [];

  const firstDayInMonth: Date = new Date(year, month - 1, 1);
  const firstDayInFieldTimestamp =
    firstDayInMonth.getTime() - (firstDayInMonth.getDay() === 0 ? 6 : firstDayInMonth.getDay() - 1) * 86400000;

  const timestamp = getTimestampFromDateState(dateState);
  const presentDay = new Date();

  for (let i = 0; i < 6; i++) {
    const week: DatePickerDayOptionsCellPropsType[] = [];

    for (let j = 0; j < 7; j++) {
      const currentTimestamp = firstDayInFieldTimestamp + (i * 7 + j) * 86400000;
      const currentDateObject = new Date(currentTimestamp);

      week.push({
        timestamp: currentTimestamp,
        date: currentDateObject.getDate(),
        isInCurrentMonth: currentDateObject.getMonth() === month - 1,
        isSelected: timestamp === currentTimestamp,
        isCurrent:
          presentDay.getDate() === currentDateObject.getDate() &&
          presentDay.getMonth() === currentDateObject.getMonth() &&
          presentDay.getFullYear() === currentDateObject.getFullYear(),
      });
    }

    options.push(week);
  }

  return options;
};
