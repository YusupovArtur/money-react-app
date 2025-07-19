import { FC } from 'react';
import { DatePickerDayCell } from './DatePickerDayCell.tsx';
import { DATE_PICKER_CELL_SIZE, DAY_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getDatePickerDayOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerDayOptions.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DateInputPickerOptionsProps {
  dateState: DateStateType | DateStateRangeType;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerDayOptions: FC<DateInputPickerOptionsProps> = ({ dateState, dateStateDispatch }) => {
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
            <DatePickerDayCell key={day.timestamp} dayCellProps={day} dateStateDispatch={dateStateDispatch} />
          ))}
        </div>
      ))}
    </div>
  );
};
