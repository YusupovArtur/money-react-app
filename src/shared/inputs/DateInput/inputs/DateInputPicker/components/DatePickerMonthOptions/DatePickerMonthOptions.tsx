import { Dispatch, FC, SetStateAction } from 'react';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DatePickerMonthOptionsCell } from './DatePickerMonthOptionsCell.tsx';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getDatePickerMonthOptions } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/getDatePickerMonthOptions.ts';

export const DatePickerMonthOptions: FC<{
  setDisplayedOptionType: Dispatch<SetStateAction<DateFieldName>>;
  displayedOption: Omit<DateStateType, 'day'>;
  setDisplayedOption: Dispatch<SetStateAction<Omit<DateStateType, 'day'>>>;
}> = ({ setDisplayedOptionType, displayedOption, setDisplayedOption }) => {
  const options = getDatePickerMonthOptions({ displayedOption });

  return (
    <div className="container text-center">
      {options.map((row) => (
        <div className="row" key={`${row[0].month}${row[1].month}${row[2].month}`}>
          {row.map((month) => (
            <DatePickerMonthOptionsCell
              key={month.month}
              datePickerMonthCellProps={month}
              setDisplayedOptionType={setDisplayedOptionType}
              setDisplayedOption={setDisplayedOption}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
