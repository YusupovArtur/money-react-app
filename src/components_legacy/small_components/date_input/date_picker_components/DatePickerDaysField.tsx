import { Dispatch, FC, SetStateAction } from 'react';
import { datePickerDayCellPropsType, dateStateType } from '../../../small_components/date_input/types';
import { DATE_PICKER_CELL_SIZE, DAY_SHORT_NAMES } from '../../../small_components/date_input/constants';

const DatePickerDayCell: FC<{
  datePickerDayCellProps: datePickerDayCellPropsType;
  setDateState: Dispatch<SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
}> = ({ datePickerDayCellProps: cellsProps, setDateState, setTimestampFunction }) => {
  const handleDatepickerSetDate = () => {
    const cellsDate = new Date(cellsProps.timestamp);
    if (setTimestampFunction) setTimestampFunction(cellsProps.timestamp);
    setDateState({ day: cellsDate.getDate(), month: cellsDate.getMonth() + 1, year: cellsDate.getFullYear() });
  };

  const buttonsClassName = cellsProps.isSelected
    ? 'btn-body-primary' // selected
    : // : cellsProps.isInPeriod.isInInterim
      // ? 'btn-body-primary-soft' // in period interim
      'btn-body'; // no selected no in period

  // const divsClassName = cellsProps.isInPeriod.isInStart
  //   ? 'bg-primary-soft rounded-start' // in period start
  //   : cellsProps.isInPeriod.isInInterim
  //   ? 'bg-primary-soft rounded-0' // in period interim
  //   : cellsProps.isInPeriod.isInEnd
  //   ? 'bg-primary-soft rounded-end' // in period end
  //   : '';

  const spanClassName = cellsProps.isSelected ? '' : cellsProps.isInCurrentMonth ? 'text-body-emphasis' : 'text-body-quaternary';

  return (
    <div
      className={`col p-0 m-0 d-flex flex-row align-items-stretch justify-content-center`}
      // ${divsClassName}
      style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          handleDatepickerSetDate();
        }}
        className={`btn p-0 m-0 d-flex align-items-center justify-content-center rounded flex-grow-1 ${buttonsClassName} ${
          cellsProps.isCurrent && 'bordered'
        }`}
      >
        <span className={spanClassName}>{cellsProps.date}</span>
      </button>
    </div>
  );
};

const DatePickerDaysField: FC<{
  datePickerDaysField: datePickerDayCellPropsType[][];
  setDateState: Dispatch<SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
}> = ({ datePickerDaysField, setDateState, setTimestampFunction }) => {
  return (
    <div className="container text-center">
      <div className="row">
        {DAY_SHORT_NAMES.map((day) => (
          <div
            key={day}
            className="col p-0 d-flex flex-row align-items-center justify-content-center"
            style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          >
            <span className="text-body-tertiary">
              <strong>{day}</strong>
            </span>
          </div>
        ))}
      </div>
      {datePickerDaysField.map((week) => (
        <div className="row" key={week[0].timestamp + week[2].timestamp}>
          {week.map((day) => (
            <DatePickerDayCell
              key={day.timestamp}
              datePickerDayCellProps={day}
              setDateState={setDateState}
              setTimestampFunction={setTimestampFunction}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatePickerDaysField;
