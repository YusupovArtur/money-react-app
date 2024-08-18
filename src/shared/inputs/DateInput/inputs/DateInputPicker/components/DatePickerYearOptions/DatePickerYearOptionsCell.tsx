import { Dispatch, FC, MouseEvent as ReactMouseEvent, SetStateAction } from 'react';
import { DatePickerYearOptionsCellPropsType } from 'shared/inputs/DateInput/types/types.ts';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

interface DatePickerYearOptionsCellProps {
  datePickerYearCellProps: DatePickerYearOptionsCellPropsType;
  setDisplayedOptionType: Dispatch<SetStateAction<DateFieldName>>;
  setDisplayedOption: Dispatch<SetStateAction<Omit<DateStateType, 'day'>>>;
}

export const DatePickerYearOptionsCell: FC<DatePickerYearOptionsCellProps> = ({
  datePickerYearCellProps: props,
  setDisplayedOption,
  setDisplayedOptionType,
}) => {
  const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setDisplayedOption((state) => ({ ...state, year: props.year }));
    setDisplayedOptionType('month');
  };

  const buttonClassName = props.isSelected ? 'btn-body-primary' : 'btn-body';
  const borderClassName = props.isCurrent ? 'bordered' : '';
  const spanClassName = props.isSelected ? '' : 'text-body-emphasis';

  return (
    <div
      className="col p-0 d-flex align-items-center justify-content-center"
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 5}rem` }}
    >
      <button
        onClick={handleClick}
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 3}rem` }}
        className={`btn ${buttonClassName} ${borderClassName} d-flex align-items-center justify-content-center rounded`}
      >
        <span className={spanClassName}>{props.year}</span>
      </button>
    </div>
  );
};
