import { Dispatch, FC, SetStateAction } from 'react';
import { DatePickerDayOptionsCell } from './DatePickerDayOptionsCell.tsx';
import { DATE_PICKER_CELL_SIZE, DAY_SHORT_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getDatePickerDayOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerDayOptions.ts';

interface DateInputPickerDayOptionsProps {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  displayedOption: Omit<DateStateType, 'day'>;
}

export const DatePickerDayOptions: FC<DateInputPickerDayOptionsProps> = ({ dateState, setDateState, displayedOption }) => {
  const options = getDatePickerDayOptions({ dateState, displayedOption });

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
            <DatePickerDayOptionsCell key={day.timestamp} datePickerDayCellProps={day} setDateState={setDateState} />
          ))}
        </div>
      ))}
    </div>
  );
};
