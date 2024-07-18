import { Dispatch, FC, SetStateAction, TouchEvent, useState } from 'react';
// Calendar fields and components_legacy
import DatePickerDaysField from '../../small_components/date_input/date_picker_components/DatePickerDaysField';
import DatePickerMonthsField from '../../small_components/date_input/date_picker_components/DatePickerMonthsField';
import DatePickerYearsField from '../../small_components/date_input/date_picker_components/DatePickerYearsField';
import {
  DatePickerCalendarButtons,
  DatePickerLabel,
  DatePickerModalButtons,
} from '../../small_components/date_input/date_picker_components/DatePickerParts';

import {
  decrementCalendar,
  getDatePickerDaysField,
  incrementCalendar,
} from '../../small_components/date_input/date_picker_components/functions';
import { getDeviceType } from '../../small_components/date_input/functions';
import { DATE_PICKER_CELL_SIZE } from '../../small_components/date_input/constants';
import { dateStateType } from '../../small_components/date_input/types';

const DateInputDatePicker: FC<{
  dateState: dateStateType;
  setDateState: Dispatch<SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
  setIsShowDatepicker: Dispatch<SetStateAction<boolean>>;
  deviseType?: 'desktop' | 'mobile';
}> = ({ dateState, setDateState, setTimestampFunction, setIsShowDatepicker, deviseType }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(dateState.month ? dateState.month - 1 : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(dateState.year ? dateState.year : new Date().getFullYear());
  const [displayedField, setDisplayedField] = useState<'day' | 'month' | 'year'>('day');
  const isDeviceMobile = deviseType === 'mobile' ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;
  let x1: number = 0,
    x2: number = 0,
    y1: number = 0,
    y2: number = 0;

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    x1 = event.changedTouches[0].clientX;
    y1 = event.changedTouches[0].clientY;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event) {
      x2 = event.changedTouches[0].clientX;
      y2 = event.changedTouches[0].clientY;
      const dx: number = x2 - x1,
        dy: number = y2 - y1;
      if (Math.abs(dx) > 1.5 * Math.abs(dy) && Math.abs(dx) > 70) {
        if (dx > 0) incrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear);
        else decrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear);
      }
    }
  };

  return (
    <div style={{ width: `${DATE_PICKER_CELL_SIZE * 7}rem` }} className="d-flex flex-column">
      {isDeviceMobile && <DatePickerLabel dateState={dateState}></DatePickerLabel>}
      {/* Calendar range setter */}
      <DatePickerCalendarButtons
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        displayedField={displayedField}
        setDisplayedField={setDisplayedField}
      ></DatePickerCalendarButtons>
      {/* Calendar field */}
      <div
        onTouchStart={(event) => {
          if (isDeviceMobile && displayedField !== 'year') handleTouchStart(event);
        }}
        onTouchEnd={(event) => {
          if (isDeviceMobile && displayedField !== 'year') handleTouchEnd(event);
        }}
      >
        {displayedField === 'day' ? (
          <DatePickerDaysField
            datePickerDaysField={getDatePickerDaysField(currentMonth, currentYear, dateState)}
            setDateState={setDateState}
            setTimestampFunction={setTimestampFunction}
          ></DatePickerDaysField>
        ) : displayedField === 'month' ? (
          <DatePickerMonthsField
            setCurrentMonth={setCurrentMonth}
            setDisplayedField={setDisplayedField}
            currentMonth={currentMonth}
            currentYear={currentYear}
          ></DatePickerMonthsField>
        ) : (
          displayedField === 'year' && (
            <DatePickerYearsField
              setCurrentYear={setCurrentYear}
              setDisplayedField={setDisplayedField}
              currentYear={currentYear}
            ></DatePickerYearsField>
          )
        )}
      </div>
      {/* Bottom buttons */}
      {isDeviceMobile && (
        <DatePickerModalButtons setDateState={setDateState} setIsShowDatepicker={setIsShowDatepicker}></DatePickerModalButtons>
      )}
    </div>
  );
};

export default DateInputDatePicker;
