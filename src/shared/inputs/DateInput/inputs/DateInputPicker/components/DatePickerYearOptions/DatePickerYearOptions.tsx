import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import { DATE_PICKER_CELL_SIZE, MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DatePickerYearOptionsCell } from './DatePickerYearOptionsCell.tsx';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getDatePickerYearOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerYearOptions.ts';

interface DatePickerYearOptionsProps {
  setDisplayedOptionType: Dispatch<SetStateAction<DateFieldName>>;
  displayedOption: Omit<DateStateType, 'day'>;
  setDisplayedOption: Dispatch<SetStateAction<Omit<DateStateType, 'day'>>>;
}

const DatePickerYearOptions: FC<DatePickerYearOptionsProps> = ({
  setDisplayedOptionType,
  displayedOption,
  setDisplayedOption,
}) => {
  const datePickerYearsFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerYearsFieldRef.current) {
      const numberOfRows = Math.ceil((MAX_YEAR - MIN_YEAR + 1) / 4);
      const currentRow = Math.ceil((displayedOption.year - MIN_YEAR + 1) / 4);
      datePickerYearsFieldRef.current.scrollTop =
        ((currentRow - 3) / numberOfRows) * datePickerYearsFieldRef.current.scrollHeight;
    }
  }, []);

  const options = getDatePickerYearOptions({ displayedOption });

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
            <DatePickerYearOptionsCell
              key={year.year}
              datePickerYearCellProps={year}
              setDisplayedOption={setDisplayedOption}
              setDisplayedOptionType={setDisplayedOptionType}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatePickerYearOptions;
