import { Dispatch, FC, SetStateAction } from 'react';
import { DATE_PICKER_CELL_SIZE, MONTH_ABBREVIATED_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { ChevronRightIcon } from 'shared/inputs/DateInput/ui/ChevronRightIcon.tsx';
import { ChevronLeftIcon } from 'shared/inputs/DateInput/ui/ChevronLeft.tsx';
import { decrementDisplayedOption } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/decrementDisplayedOption.ts';
import { incrementDisplayedOption } from 'shared/inputs/DateInput/inputs/DateInputPicker/helpers/incrementDisplayedOption.ts';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

interface DatePickerControlButtonsProps {
  displayedOptionType: DateFieldName;
  setDisplayedOptionType: Dispatch<SetStateAction<DateFieldName>>;
  displayedOption: Omit<DateStateType, 'day'>;
  setDisplayedOption: Dispatch<SetStateAction<Omit<DateStateType, 'day'>>>;
}

export const DatePickerControlButtons: FC<DatePickerControlButtonsProps> = ({
  displayedOptionType,
  setDisplayedOptionType,
  displayedOption,
  setDisplayedOption,
}) => {
  const handleIncrement = () => {
    incrementDisplayedOption({ displayedOptionType, displayedOption, setDisplayedOption });
  };

  const handleDecrement = () => {
    decrementDisplayedOption({ displayedOptionType, displayedOption, setDisplayedOption });
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <button
          onClick={() => (displayedOptionType === 'month' ? setDisplayedOptionType('day') : setDisplayedOptionType('month'))}
          className=" btn btn-body rounded"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{MONTH_ABBREVIATED_NAMES[displayedOption.month - 1]}</span>
        </button>
        <button
          onClick={() => (displayedOptionType === 'year' ? setDisplayedOptionType('day') : setDisplayedOptionType('year'))}
          className="btn btn-body rounded"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{displayedOption.year}</span>
        </button>
      </div>

      <div className="d-flex">
        <button
          onClick={handleDecrement}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center"
        >
          <ChevronLeftIcon iconSize="1rem" />
        </button>
        <button
          onClick={handleIncrement}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center"
        >
          <ChevronRightIcon iconSize="1rem" />
        </button>
      </div>
    </div>
  );
};
