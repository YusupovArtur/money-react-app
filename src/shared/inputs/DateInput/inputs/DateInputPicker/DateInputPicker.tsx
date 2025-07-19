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
import { DateStateRangeType, DateStateType, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import {
  DatePickerProvider,
  useDatePickerContext,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { useSwipeChangeCalendar } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useSwipeChangeCalendar.ts';
import {
  DateStateDispatcherAction,
  useDateStateDispatcher,
} from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';
import { DatePickerRangeLevelMenu } from 'shared/inputs/DateInput/inputs/DateInputPicker/components/DatePickerRangeLevelMenu.tsx';

type DateStateProps = {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  dateStateRange?: never;
  setDateStateRange?: never;
};

type DateStateRangeProps = {
  dateState?: never;
  setDateState?: never;
  dateStateRange: DateStateRangeType;
  setDateStateRange: Dispatch<SetStateAction<DateStateRangeType>>;
};

interface DateInputDatePickerProps {
  setIsOpenedDatepicker: Dispatch<SetStateAction<boolean>>;
  isModal?: boolean;
}

export const DateInputPicker: FC<DateInputDatePickerProps & (DateStateProps | DateStateRangeProps)> = ({
  dateState,
  setDateState,
  dateStateRange,
  setDateStateRange,
  setIsOpenedDatepicker,
  isModal = false,
}) => {
  const dispatch = useDateStateDispatcher(
    setDateState ? { setDateState: setDateState } : { setDateStateRange: setDateStateRange },
  );

  return (
    <DatePickerProvider initialDateState={dateState || dateStateRange}>
      <DateInputPickerInner
        dateState={dateState || dateStateRange}
        dateStateDispatch={dispatch}
        setIsOpenedDatepicker={setIsOpenedDatepicker}
        isModal={isModal}
      />
    </DatePickerProvider>
  );
};

interface DateInputDatePickerInnerProps {
  dateState: DateStateType | DateStateRangeType;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
  setIsOpenedDatepicker: Dispatch<SetStateAction<boolean>>;
  isModal?: boolean;
}

const DateInputPickerInner: FC<DateInputDatePickerInnerProps> = ({
  dateState,
  dateStateDispatch,
  setIsOpenedDatepicker,
  isModal = false,
}) => {
  const { state } = useDatePickerContext();
  const { handleTouchStart, handleTouchEnd } = useSwipeChangeCalendar(isModal);

  return (
    <div style={{ width: `${DATE_PICKER_CELL_SIZE * 7}rem` }} className="d-flex flex-column">
      {isDateStateRange(dateState) && (
        <DatePickerRangeLevelMenu dateState={dateState} dateStateDispatch={dateStateDispatch} isModal={isModal} />
      )}

      {/*Label*/}
      {isModal && <DatePickerLabel dateState={dateState} />}

      {/* Control */}
      <DatePickerControlButtons />

      {/* Options */}
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {state.calendarLevel === 'day' && <DatePickerDayOptions dateState={dateState} dateStateDispatch={dateStateDispatch} />}
        {state.calendarLevel === 'month' && (
          <DatePickerMonthOptions dateState={dateState} dateStateDispatch={dateStateDispatch} />
        )}
        {state.calendarLevel === 'year' && <DatePickerYearOptions dateState={dateState} dateStateDispatch={dateStateDispatch} />}
      </div>

      {/* Modal control buttons */}
      {isModal && (
        <DatePickerModalControlButtons dateStateDispatch={dateStateDispatch} setIsOpenedDatepicker={setIsOpenedDatepicker} />
      )}
    </div>
  );
};
