import { Dispatch, FC, SetStateAction } from 'react';
import { datePickerMonthCellPropsType } from '../types';
import { DATE_PICKER_CELL_SIZE, MONTH_SHORT_NAMES } from '../constants';

const DatePickerMonthCell: FC<{
  datePickerMonthCellProps: datePickerMonthCellPropsType;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setDisplayedField: Dispatch<SetStateAction<'day' | 'month' | 'year'>>;
}> = ({ datePickerMonthCellProps, setCurrentMonth, setDisplayedField }) => {
  return (
    <div
      className="col p-0 d-flex flex-row align-items-center justify-content-center"
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 3}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem` }}
    >
      <button
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 2}rem` }}
        onClick={(event) => {
          event.preventDefault();
          setCurrentMonth(datePickerMonthCellProps.monthOrder);
          setDisplayedField('day');
        }}
        className={`btn ${datePickerMonthCellProps.isSelected ? 'btn-body-primary' : 'btn-body'} ${
          datePickerMonthCellProps.isCurrent ? 'bordered' : ''
        } d-flex align-items-center justify-content-center rounded`}
      >
        <span className="'text-body-emphasis'">{datePickerMonthCellProps.shortName}</span>
      </button>
    </div>
  );
};

const DatePickerMonthsField: FC<{
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setDisplayedField: Dispatch<SetStateAction<'day' | 'month' | 'year'>>;
  currentMonth: number;
  currentYear: number;
}> = ({ setCurrentMonth, setDisplayedField, currentMonth, currentYear }) => {
  const datepickerMonthsField: datePickerMonthCellPropsType[][] = [];
  for (let i = 0; i < 4; i++) {
    const monthsRow: datePickerMonthCellPropsType[] = [];
    for (let j = 0; j < 3; j++) {
      const order = i * 3 + j;
      const presentDay = new Date();
      monthsRow.push({
        monthOrder: order,
        shortName: MONTH_SHORT_NAMES[order],
        isSelected: order === currentMonth,
        isCurrent: presentDay.getMonth() === order && presentDay.getFullYear() === currentYear,
      });
    }
    datepickerMonthsField.push(monthsRow);
  }

  return (
    <div className="container text-center">
      {datepickerMonthsField.map((row) => (
        <div className="row" key={`${row[0].monthOrder}${row[1].monthOrder}${row[2].monthOrder}`}>
          {row.map((month) => (
            <DatePickerMonthCell
              key={month.monthOrder}
              datePickerMonthCellProps={month}
              setCurrentMonth={setCurrentMonth}
              setDisplayedField={setDisplayedField}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatePickerMonthsField;
