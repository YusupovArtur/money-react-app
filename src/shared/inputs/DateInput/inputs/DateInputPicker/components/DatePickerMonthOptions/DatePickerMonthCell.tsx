import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { DatePickerMonthCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DatePickerMonthOptionsCellProps {
  monthCellProps: DatePickerMonthCellProps;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerMonthCell: FC<DatePickerMonthOptionsCellProps> = ({ monthCellProps, dateStateDispatch }) => {
  const { state, dispatch } = useDatePickerContext();

  const { month, shortName, isToday, isSelectedByCalendarState, isBetween, isLeft, isRight } = monthCellProps;

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!state.isRange || state.rangeLevel !== 'month') {
      dispatch({ type: 'setCalendarState', payload: { month: month } });
      dispatch({ type: 'setCalendarLevel', payload: 'day' });
    }

    if (state.isRange && state.rangeLevel === 'month') {
      dateStateDispatch({ type: 'setMonth', payload: { day: 1, month: month, year: state.calendarState.year } });
    }
  };

  const buttonClassName = isSelectedByCalendarState ? 'btn-body-primary' : isBetween ? 'btn-body-primary-soft' : 'btn-body';
  const borderClassName = isToday ? 'bordered' : '';
  const spanClassName = isSelectedByCalendarState ? '' : 'text-body-emphasis';
  const divClassName = `${isBetween ? 'bg-primary-soft' : ''} ${isLeft ? 'rounded-start-2' : ''} ${isRight ? 'rounded-end-2' : ''}`;

  return (
    <div
      className={`col p-0 d-flex align-items-center justify-content-center ${divClassName}`}
      style={{ width: `${(DATE_PICKER_CELL_SIZE * 7) / 3}rem`, height: `${(DATE_PICKER_CELL_SIZE * 7) / 4}rem` }}
    >
      <button
        onClick={handleClick}
        style={{ height: `${DATE_PICKER_CELL_SIZE}rem`, paddingInline: `${DATE_PICKER_CELL_SIZE / 2}rem` }}
        className={`btn ${buttonClassName} ${borderClassName} d-flex align-items-center justify-content-center rounded`}
      >
        <span className={spanClassName}>{shortName}</span>
      </button>
    </div>
  );
};
