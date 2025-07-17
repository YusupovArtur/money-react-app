import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { DatePickerYearCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

interface DatePickerYearOptionsCellProps {
  yearCellProps: DatePickerYearCellProps;
}

export const DatePickerYearCell: FC<DatePickerYearOptionsCellProps> = ({ yearCellProps }) => {
  const { dispatch } = useDatePickerContext();

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    dispatch({ type: 'setCalendarState', payload: { year: yearCellProps.year } });
    dispatch({ type: 'setCalendarLevel', payload: 'month' });
  };

  const buttonClassName = yearCellProps.isSelected ? 'btn-body-primary' : 'btn-body';
  const borderClassName = yearCellProps.isCurrent ? 'bordered' : '';
  const spanClassName = yearCellProps.isSelected ? '' : 'text-body-emphasis';

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
        <span className={spanClassName}>{yearCellProps.year}</span>
      </button>
    </div>
  );
};
