import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { DatePickerYearCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DatePickerYearOptionsCellProps {
  yearCellProps: DatePickerYearCellProps;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerYearCell: FC<DatePickerYearOptionsCellProps> = ({ yearCellProps, dateStateDispatch }) => {
  const { state, dispatch } = useDatePickerContext();
  const { year, isToday, isSelectedByCalendarState, isBetween, isLeft, isRight } = yearCellProps;

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!state.isRange || state.rangeLevel !== 'year') {
      dispatch({ type: 'setCalendarState', payload: { year: year } });
      dispatch({ type: 'setCalendarLevel', payload: 'month' });
    }

    if (state.isRange && state.rangeLevel === 'year') {
      dateStateDispatch({ type: 'setYear', payload: { day: 1, month: 1, year: year } });
    }
  };

  const buttonClassName = isSelectedByCalendarState ? 'btn-body-primary' : isBetween ? 'btn-body-primary-soft' : 'btn-body';
  const borderClassName = isToday ? 'bordered' : '';
  const spanClassName = isSelectedByCalendarState ? '' : 'text-body-emphasis';
  const divClassName = `${isBetween ? 'bg-primary-soft' : ''} ${isLeft ? 'rounded-start-2' : ''} ${isRight ? 'rounded-end-2' : ''}`;

  return (
    <div
      className={`col p-0 d-flex align-items-center justify-content-center ${divClassName}`}
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 5}rem` }}
    >
      <button
        onClick={handleClick}
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 3}rem` }}
        className={`btn ${buttonClassName} ${borderClassName} d-flex align-items-center justify-content-center rounded`}
      >
        <span className={spanClassName}>{year}</span>
      </button>
    </div>
  );
};
