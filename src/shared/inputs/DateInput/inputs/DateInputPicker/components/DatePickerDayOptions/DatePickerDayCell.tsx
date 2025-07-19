import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { DatePickerDayCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/types.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DateInputPickerDayOptionsCellProps {
  dayCellProps: DatePickerDayCellProps;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
}

export const DatePickerDayCell: FC<DateInputPickerDayOptionsCellProps> = ({ dayCellProps, dateStateDispatch }) => {
  const { isToday, isBetween, isSelected, isInCurrentMonth, date, timestamp, isLeft, isRight } = dayCellProps;

  const buttonsClassName = isSelected ? 'btn-body-primary' : isBetween ? 'btn-body-primary-soft' : 'btn-body';
  const borderClassName = isToday ? 'bordered-emphasis' : '';
  const colorClassName = isSelected ? '' : isInCurrentMonth ? 'text-body-emphasis' : 'text-body-quaternary';

  const divClassName = `${isBetween ? 'bg-primary-soft' : ''} ${isLeft ? 'rounded-start-2' : ''} ${isRight ? 'rounded-end-2' : ''}`;

  const handleDatepickerSetDate = () => {
    dateStateDispatch({
      type: 'setDay',
      payload: getDateStateFromTimestamp(timestamp),
    });
  };

  const handlePreventDefault = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleDatepickerSetDate();
  };

  return (
    <div style={{ width: 'fit-content', height: 'fit-content', margin: 0, padding: 0 }} className={divClassName}>
      <button
        onClick={handlePreventDefault}
        style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
        className={`col btn ${buttonsClassName} ${borderClassName} ${colorClassName} rounded p-0`}
      >
        {date}
      </button>
    </div>
  );
};
