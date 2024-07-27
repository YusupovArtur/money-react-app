import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import { datePickerYearCellPropsType } from '../../../big_components/date_input_legacy/types';
import { DATE_PICKER_CELL_SIZE, MAX_YEAR, MIN_YEAR } from '../../../big_components/date_input_legacy/constants';

const DatepickerYearCell: FC<{
  datePickerYearCellProps: datePickerYearCellPropsType;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  setDisplayedField: Dispatch<SetStateAction<'day' | 'month' | 'year'>>;
}> = ({ datePickerYearCellProps, setCurrentYear, setDisplayedField }) => {
  return (
    <div
      className="col p-0 d-flex flex-row align-items-center justify-content-center"
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 5}rem` }}
    >
      <button
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 3}rem` }}
        onClick={(event) => {
          event.preventDefault();
          setCurrentYear(datePickerYearCellProps.year);
          setDisplayedField('month');
        }}
        className={`btn ${datePickerYearCellProps.isSelected ? 'btn-body-primary' : 'btn-body'} ${
          datePickerYearCellProps.isCurrent ? 'bordered' : ''
        } d-flex align-items-center justify-content-center rounded`}
        id={datePickerYearCellProps.isSelected ? 'currentYearAnchor' : ''}
      >
        <span className="'text-body-emphasis'">{datePickerYearCellProps.year}</span>
      </button>
    </div>
  );
};

const DatepickerYearsField: FC<{
  setCurrentYear: Dispatch<SetStateAction<number>>;
  setDisplayedField: Dispatch<SetStateAction<'day' | 'month' | 'year'>>;
  currentYear: number;
}> = ({ setCurrentYear, setDisplayedField, currentYear }) => {
  const datePickerYearsFieldRef = useRef<HTMLInputElement | null>(null);
  const datepickerYearsField: datePickerYearCellPropsType[][] = [];

  useEffect(() => {
    if (datePickerYearsFieldRef.current) {
      const numberOfRows = Math.ceil((MAX_YEAR - MIN_YEAR + 1) / 4);
      const currentRow = Math.ceil((currentYear - MIN_YEAR + 1) / 4);
      datePickerYearsFieldRef.current.scrollTop =
        ((currentRow - 3) / numberOfRows) * datePickerYearsFieldRef.current.scrollHeight;
    }
  }, []);

  for (let i = 0; i <= (MAX_YEAR - MIN_YEAR) / 4; i++) {
    const yearRow: datePickerYearCellPropsType[] = [];
    for (let j = 0; j < 4; j++) {
      const order = MIN_YEAR + i * 4 + j;
      yearRow.push({ year: order, isSelected: order === currentYear, isCurrent: new Date().getFullYear() === order });
    }
    datepickerYearsField.push(yearRow);
  }

  return (
    <div
      className="container text-center"
      style={{
        width: `${DATE_PICKER_CELL_SIZE * 7}rem`,
        height: `${DATE_PICKER_CELL_SIZE * 7}rem`,
        overflowY: 'scroll',
      }}
      ref={datePickerYearsFieldRef}
    >
      {datepickerYearsField.map((row) => (
        <div className="row" key={`${row[0].year}${row[1].year}${row[2].year}`}>
          {row.map((year) => (
            <DatepickerYearCell
              key={year.year}
              datePickerYearCellProps={year}
              setCurrentYear={setCurrentYear}
              setDisplayedField={setDisplayedField}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatepickerYearsField;
