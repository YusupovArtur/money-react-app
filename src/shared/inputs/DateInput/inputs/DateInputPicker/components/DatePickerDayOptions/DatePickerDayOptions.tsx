import { Dispatch, FC, SetStateAction } from 'react';
import { DatePickerDayCell } from './DatePickerDayCell.tsx';
import { DATE_PICKER_CELL_SIZE, DAY_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getDatePickerDayOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerDayOptions.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

interface DateInputPickerDayOptionsProps {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
}

export const DatePickerDayOptions: FC<DateInputPickerDayOptionsProps> = ({ dateState, setDateState }) => {
  const { state } = useDatePickerContext();

  const options = getDatePickerDayOptions({ dateState, calendarState: state.calendarState });

  return (
    <div className="container text-center">
      <div className="row">
        {DAY_SHORT_NAMES.map((day) => (
          <div
            key={day}
            className="col d-flex align-items-center justify-content-center"
            style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          >
            <strong className="text-body-tertiary">{day}</strong>
          </div>
        ))}
      </div>

      {options.map((week) => (
        <div className="row" key={week[0].timestamp + week[1].timestamp}>
          {week.map((day) => (
            <DatePickerDayCell key={day.timestamp} dayCellProps={day} setDateState={setDateState} />
          ))}
        </div>
      ))}
    </div>
  );
};
