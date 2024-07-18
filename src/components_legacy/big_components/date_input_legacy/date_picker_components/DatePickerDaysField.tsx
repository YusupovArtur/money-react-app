import { FC } from 'react';
import { datePickerDayCellPropsType } from '../types.ts';
import { getDatePickerNewValue } from '../functions.ts';
import { DATE_PICKER_CELL_SIZE, DAY_SHORT_NAMES } from '../constants.ts';

const DatePickerDayCell: FC<{
  datePickerDayCellProps: datePickerDayCellPropsType;
  setDateInputValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ datePickerDayCellProps: cellsProps, setDateInputValue }) => {
  const handleDatepickerSetDate = () => {
    const cellsDate = new Date(cellsProps.timestamp);
    setDateInputValue((value) => {
      const stringDay = cellsDate.getDate().toString().padStart(2, '0');
      const stringMonth = (cellsDate.getMonth() + 1).toString().padStart(2, '0');
      const stringYear = cellsDate.getFullYear().toString().padStart(4, '0');
      const newValue = getDatePickerNewValue(value, `${stringDay}.${stringMonth}.${stringYear}`);
      return getDatePickerNewValue(value, `${stringDay}.${stringMonth}.${stringYear}`);
    });
  };

  const buttonsClassName = cellsProps.isSelected
    ? 'btn-body-primary' // selected
    : cellsProps.isInPeriod.isInInterim
    ? 'btn-body-primary-soft' // in period interim
    : 'btn-body'; // no selected no in period

  const divsClassName = cellsProps.isInPeriod.isInStart
    ? 'bg-primary-soft rounded-start' // in period start
    : cellsProps.isInPeriod.isInInterim
    ? 'bg-primary-soft rounded-0' // in period interim
    : cellsProps.isInPeriod.isInEnd
    ? 'bg-primary-soft rounded-end' // in period end
    : '';

  const spanClassName = cellsProps.isSelected ? '' : cellsProps.isInCurrentMonth ? 'text-body-emphasis' : 'text-body-quaternary';

  return (
    <div
      className={`col p-0 m-0 d-flex flex-row align-items-stretch justify-content-center ${divsClassName}`}
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
  setDateInputValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ datePickerDaysField, setDateInputValue }) => {
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
              setDateInputValue={setDateInputValue}
            ></DatePickerDayCell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatePickerDaysField;
