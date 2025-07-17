import { Dispatch, FC, MouseEvent as ReactMouseEvent, SetStateAction } from 'react';
import { DatePickerDayCellProps } from 'shared/inputs/DateInput/inputs/DateInputPicker/types.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';

interface DateInputPickerDayOptionsCellProps {
  dayCellProps: DatePickerDayCellProps;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
}

export const DatePickerDayCell: FC<DateInputPickerDayOptionsCellProps> = ({ dayCellProps, setDateState }) => {
  const buttonsClassName = dayCellProps.isSelected ? 'btn-body-primary' : 'btn-body';
  const borderClassName = dayCellProps.isCurrent ? 'bordered-emphasis' : '';
  const colorClassName = dayCellProps.isSelected
    ? ''
    : dayCellProps.isInCurrentMonth
      ? 'text-body-emphasis'
      : 'text-body-quaternary';

  const handleDatepickerSetDate = () => {
    setDateState(getDateStateFromTimestamp(dayCellProps.timestamp));
  };

  const handlePreventDefault = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleDatepickerSetDate();
  };

  return (
    <button
      onClick={handlePreventDefault}
      style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
      className={`col btn ${buttonsClassName} ${borderClassName} ${colorClassName} rounded p-0`}
    >
      {dayCellProps.date}
    </button>
  );
};
