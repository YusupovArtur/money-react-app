import { DatePickerDayOptionsCellPropsType } from 'shared/inputs/DateInput/types/types.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { DateUTC, getTodayTimestamp } from 'shared/helpers';

export const getDatePickerDayOptions = (props: {
  dateState: DateStateType;
  displayedOption: Omit<DateStateType, 'day'>;
}): DatePickerDayOptionsCellPropsType[][] => {
  const {
    dateState,
    displayedOption: { month, year },
  } = props;

  const options: DatePickerDayOptionsCellPropsType[][] = [];
  const stateTimestamp = getTimestampFromDateState(dateState);
  const today = new DateUTC(getTodayTimestamp());

  const firstInMonth = new DateUTC(new Date(Date.UTC(year, month - 1, 1)).getTime());
  const firstTimestampOption = firstInMonth.timestamp - (firstInMonth.getDay() === 0 ? 6 : firstInMonth.getDay() - 1) * 86400000;

  for (let i = 0; i < 6; i++) {
    const week: DatePickerDayOptionsCellPropsType[] = [];

    for (let j = 0; j < 7; j++) {
      const currentTimestamp = firstTimestampOption + (i * 7 + j) * 86400000;
      const currentDate = new DateUTC(currentTimestamp);

      week.push({
        timestamp: currentTimestamp,
        date: currentDate.getDate(),
        isInCurrentMonth: currentDate.getMonth() === month - 1,
        isSelected: stateTimestamp === currentTimestamp,
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
