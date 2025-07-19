import { FC, useEffect, useRef } from 'react';
import { DATE_PICKER_CELL_SIZE, MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DatePickerYearCell } from './DatePickerYearCell.tsx';
import { getDatePickerYearOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerYearOptions.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DateInputPickerOptionsProps {
  dateState: DateStateType | DateStateRangeType;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerYearOptions: FC<DateInputPickerOptionsProps> = ({ dateState, dateStateDispatch }) => {
  const datePickerYearsFieldRef = useRef<HTMLInputElement>(null);

  const { state } = useDatePickerContext();

  useEffect(() => {
    if (datePickerYearsFieldRef.current) {
      const numberOfRows = Math.ceil((MAX_YEAR - MIN_YEAR + 1) / 4);
      const currentRow = Math.ceil((state.calendarState.year - MIN_YEAR + 1) / 4);
      datePickerYearsFieldRef.current.scrollTop =
        ((currentRow - 3) / numberOfRows) * datePickerYearsFieldRef.current.scrollHeight;
    }
  }, []);

  const options = getDatePickerYearOptions({ calendarState: state.calendarState, dateState: dateState });

  return (
    <div
      ref={datePickerYearsFieldRef}
      className="container text-center"
      style={{
        width: `${DATE_PICKER_CELL_SIZE * 7}rem`,
        height: `${DATE_PICKER_CELL_SIZE * 7}rem`,
        overflowY: 'scroll',
      }}
    >
      {options.map((row) => (
        <div className="row" key={`${row[0].year}${row[1].year}${row[2].year}`}>
          {row.map((year) => (
            <DatePickerYearCell key={year.year} yearCellProps={year} dateStateDispatch={dateStateDispatch} />
          ))}
        </div>
      ))}
    </div>
  );
};
