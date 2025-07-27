import { DATE_PICKER_CELL_SIZE, MONTH_ABBREVIATED_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { ChevronRightIcon } from 'shared/inputs/DateInput/ui/ChevronRightIcon.tsx';
import { ChevronLeftIcon } from 'shared/inputs/DateInput/ui/ChevronLeft.tsx';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

export const DatePickerControlButtons = () => {
  const { state, dispatch } = useDatePickerContext();

  const handleIncrement = () => {
    dispatch({ type: 'incrementCalendarState' });
  };
  const handleDecrement = () => {
    dispatch({ type: 'decrementCalendarState' });
  };
  const handleMonthButton = () => {
    dispatch({ type: 'setCalendarLevel', payload: 'month' });
  };
  const handleYearButton = () => {
    dispatch({ type: 'setCalendarLevel', payload: 'year' });
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <button onClick={handleMonthButton} className=" btn btn-body rounded">
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{MONTH_ABBREVIATED_NAMES[state.calendarState.month - 1]}</span>
        </button>
        <button onClick={handleYearButton} className="btn btn-body rounded">
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{state.calendarState.year}</span>
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
