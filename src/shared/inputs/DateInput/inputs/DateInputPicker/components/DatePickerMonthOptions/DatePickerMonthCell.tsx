import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { DatePickerMonthCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

interface DatePickerMonthOptionsCellProps {
  monthCellProps: DatePickerMonthCellProps;
}

export const DatePickerMonthCell: FC<DatePickerMonthOptionsCellProps> = ({ monthCellProps }) => {
  const { dispatch } = useDatePickerContext();

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: 'setCalendarState', payload: { month: monthCellProps.month } });
    dispatch({ type: 'setCalendarLevel', payload: 'day' });
  };

  const buttonClassName = monthCellProps.isSelected ? 'btn-body-primary' : 'btn-body';
  const borderClassName = monthCellProps.isCurrent ? 'bordered' : '';
  const spanClassName = monthCellProps.isSelected ? '' : 'text-body-emphasis';

  return (
    <div
      className="col p-0 d-flex align-items-center justify-content-center"
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 3}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem` }}
    >
      <button
        onClick={handleClick}
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 2}rem` }}
        className={`btn ${buttonClassName} ${borderClassName} d-flex align-items-center justify-content-center rounded`}
      >
        <span className={spanClassName}>{monthCellProps.shortName}</span>
      </button>
    </div>
  );
};
