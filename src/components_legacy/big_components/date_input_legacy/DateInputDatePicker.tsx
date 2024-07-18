import { FC, useState, Dispatch, SetStateAction, TouchEvent } from 'react';
// Calendar fields and components_legacy
import DatePickerDaysField from '../../big_components/date_input_legacy/date_picker_components/DatePickerDaysField';
import DatePickerMonthsField from '../../big_components/date_input_legacy/date_picker_components/DatePickerMonthsField';
import DatePickerYearsField from '../../big_components/date_input_legacy/date_picker_components/DatePickerYearsField';
import { DatePickerLabel, DatePickerCalendarButtons, DatePickerModalButtons } from './date_picker_components/DatePickerParts.tsx';

import { getDatePickerDaysField } from './date_picker_components/functions.ts';
import { getDeviceType } from './functions.ts';
import { DATE_PICKER_CELL_SIZE } from './constants.ts';
import { incrementCalendar, decrementCalendar } from './date_picker_components/functions.ts';

const DateInputDatePicker: FC<{
  dateInputValue: string;
  setDateInputValue: Dispatch<SetStateAction<string>>;
  setIsShowDatepicker: Dispatch<SetStateAction<boolean>>;
  deviseType?: 'desktop' | 'mobile';
}> = ({ dateInputValue, setDateInputValue, setIsShowDatepicker, deviseType }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    dateInputValue.substring(3, 5) !== 'мм' ? parseInt(dateInputValue.substring(3, 5)) - 1 : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    dateInputValue.substring(6, 10) !== 'гггг' ? parseInt(dateInputValue.substring(6, 10)) : new Date().getFullYear(),
  );
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
    if (event !== undefined) {
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
      {isDeviceMobile && <DatePickerLabel dateInputValue={dateInputValue}></DatePickerLabel>}
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
            datePickerDaysField={getDatePickerDaysField(currentMonth, currentYear, dateInputValue)}
            setDateInputValue={setDateInputValue}
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
        <DatePickerModalButtons
          setDateInputValue={setDateInputValue}
          setIsShowDatepicker={setIsShowDatepicker}
        ></DatePickerModalButtons>
      )}
    </div>
  );
};

export default DateInputDatePicker;