import { Dispatch, FC, SetStateAction } from 'react';
// Picker
import { DatePickerLabel } from './components/DatePickerModalLabel.tsx';
import { DatePickerControlButtons } from './components/DatePickerControlButtons.tsx';
import { DatePickerDayOptions } from './components/DatePickerDayOptions/DatePickerDayOptions.tsx';
import { DatePickerMonthOptions } from './components/DatePickerMonthOptions/DatePickerMonthOptions.tsx';
import { DatePickerYearOptions } from './components/DatePickerYearOptions/DatePickerYearOptions.tsx';
import { DatePickerModalControlButtons } from './components/DatePickerModalControlButtons.tsx';
// Types
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import {
  DatePickerProvider,
  useDatePickerContext,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { useSwipeChangeCalendar } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useSwipeChangeCalendar.ts';

interface DateInputDatePickerProps {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  setIsOpenedDatepicker: Dispatch<SetStateAction<boolean>>;
  isModal?: boolean;
}

export const DateInputPicker: FC<DateInputDatePickerProps> = ({
  dateState,
  setDateState,
  setIsOpenedDatepicker,
  isModal = false,
}) => {
  return (
    <DatePickerProvider initialDateState={dateState}>
      <DateInputPickerInner
        dateState={dateState}
        setDateState={setDateState}
        setIsOpenedDatepicker={setIsOpenedDatepicker}
        isModal={isModal}
      />
    </DatePickerProvider>
  );
};

const DateInputPickerInner: FC<DateInputDatePickerProps> = ({
  dateState,
  setDateState,
  setIsOpenedDatepicker,
  isModal = false,
}) => {
  const { state } = useDatePickerContext();
  const { handleTouchStart, handleTouchEnd } = useSwipeChangeCalendar(isModal);

  return (
    <div style={{ width: `${DATE_PICKER_CELL_SIZE * 7}rem` }} className="d-flex flex-column">
      {/*Label*/}
      {isModal && <DatePickerLabel dateState={dateState} />}

      {/* Control */}
      <DatePickerControlButtons />

      {/* Options */}
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {state.calendarLevel === 'day' && <DatePickerDayOptions dateState={dateState} setDateState={setDateState} />}
        {state.calendarLevel === 'month' && <DatePickerMonthOptions />}
        {state.calendarLevel === 'year' && <DatePickerYearOptions />}
      </div>

      {/* Modal control buttons */}
      {isModal && <DatePickerModalControlButtons setDateState={setDateState} setIsOpenedDatepicker={setIsOpenedDatepicker} />}
    </div>
  );
};
