import { Dispatch, FC, MouseEvent as ReactMouseEvent, SetStateAction } from 'react';
import { DatePickerDayOptionsCellPropsType } from 'shared/inputs/DateInput/types/types.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import './text-color-quaternary.scss';
import { getDateStateFromTimestamp } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';

interface DateInputPickerDayOptionsCellProps {
  datePickerDayCellProps: DatePickerDayOptionsCellPropsType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
}

export const DatePickerDayOptionsCell: FC<DateInputPickerDayOptionsCellProps> = ({
  datePickerDayCellProps: props,
  setDateState,
}) => {
  const buttonsClassName = props.isSelected ? 'btn-body-primary' : 'btn-body';
  const borderClassName = props.isCurrent ? 'bordered-emphasis' : '';
  const colorClassName = props.isSelected ? '' : props.isInCurrentMonth ? 'text-body-emphasis' : 'text-body-quaternary';

  const handleDatepickerSetDate = () => {
    setDateState(getDateStateFromTimestamp(props.timestamp));
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
      {props.date}
    </button>
  );
};
