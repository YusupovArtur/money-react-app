import { FC } from 'react';
import { DatePickerMonthCell } from './DatePickerMonthCell.tsx';
import { getDatePickerMonthOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerMonthOptions.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DateInputPickerOptionsProps {
  dateState: DateStateType | DateStateRangeType;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerMonthOptions: FC<DateInputPickerOptionsProps> = ({ dateState, dateStateDispatch }) => {
  const { state } = useDatePickerContext();
  const options = getDatePickerMonthOptions({ calendarState: state.calendarState, dateState: dateState });

  return (
    <div className="container text-center">
      {options.map((row) => (
        <div className="row" key={`${row[0].month}${row[1].month}${row[2].month}`}>
          {row.map((month) => (
            <DatePickerMonthCell key={month.month} monthCellProps={month} dateStateDispatch={dateStateDispatch} />
          ))}
        </div>
      ))}
    </div>
  );
};
