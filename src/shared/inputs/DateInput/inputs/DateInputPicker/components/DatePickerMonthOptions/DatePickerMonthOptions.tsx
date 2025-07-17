import { FC } from 'react';
import { DatePickerMonthCell } from './DatePickerMonthCell.tsx';
import { getDatePickerMonthOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerMonthOptions.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

export const DatePickerMonthOptions: FC = () => {
  const { state } = useDatePickerContext();
  const options = getDatePickerMonthOptions({ calendarState: state.calendarState });

  return (
    <div className="container text-center">
      {options.map((row) => (
        <div className="row" key={`${row[0].month}${row[1].month}${row[2].month}`}>
          {row.map((month) => (
            <DatePickerMonthCell key={month.month} monthCellProps={month} />
          ))}
        </div>
      ))}
    </div>
  );
};
