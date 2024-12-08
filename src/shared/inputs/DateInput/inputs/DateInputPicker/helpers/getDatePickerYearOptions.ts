import { DatePickerYearOptionsCellPropsType } from 'shared/inputs/DateInput/types/types.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getDatePickerYearOptions = (props: { displayedOption: Omit<DateStateType, 'day'> }) => {
  const year = props.displayedOption.year;
  const options: DatePickerYearOptionsCellPropsType[][] = [];

  for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
    const row: DatePickerYearOptionsCellPropsType[] = [];
    for (let j = 0; j < 4; j++) {
      const order = MIN_YEAR + i * 4 + j;
      row.push({ year: order, isSelected: order === year, isCurrent: new Date().getFullYear() === order });
    }
    options.push(row);
  }

  return options;
};
