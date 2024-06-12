import React from 'react';
import { incrementCalendar, decrementCalendar } from 'components/small_components/date_input/date_picker_components/functions';
import { getMobileDatePickersLabel } from 'components/small_components/date_input/functions';
import { ChevrontRightIconSVG, ChevronLeftIconSVG } from 'components/small_components/icons_svg/IconsSVG';
import { DATE_PICKER_CELL_SIZE, MONTH_ABBREVIATED_NAMES } from 'components/small_components/date_input/constants';

export const DatePickerLabel: React.FC<{ dateInputValue: string }> = ({ dateInputValue }) => {
  return (
    <div className="py-3 px-2 text-body-emphasis" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
      {getMobileDatePickersLabel(dateInputValue)}
    </div>
  );
};

interface DatePickerCalendarButtonsProps {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  displayedField: 'month' | 'day' | 'year';
  setDisplayedField: React.Dispatch<React.SetStateAction<'month' | 'day' | 'year'>>;
}
export const DatePickerCalendarButtons: React.FC<DatePickerCalendarButtonsProps> = ({
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  displayedField,
  setDisplayedField,
}) => {
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-row justify-content-center align-items-stretch text-body-emphasis">
        <button
          onClick={() => (displayedField === 'month' ? setDisplayedField('day') : setDisplayedField('month'))}
          className=" btn btn-body px-2 rounded"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{MONTH_ABBREVIATED_NAMES[currentMonth]}</span>
        </button>
        <button
          onClick={() => (displayedField === 'year' ? setDisplayedField('day') : setDisplayedField('year'))}
          className="btn btn-body px-2 rounded"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currentYear}</span>
        </button>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <button
          onClick={() => decrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center rounded"
        >
          <ChevronLeftIconSVG iconSize="1rem"></ChevronLeftIconSVG>
        </button>
        <button
          onClick={() => incrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center rounded"
        >
          <ChevrontRightIconSVG iconSize="1rem"></ChevrontRightIconSVG>
        </button>
      </div>
    </div>
  );
};

export const DatePickerModalButtons: React.FC<{
  setDateInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsShowDatepicker: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDateInputValue, setIsShowDatepicker }) => {
  return (
    <div className="d-flex justify-content-end">
      <button
        onClick={() => {
          setDateInputValue((value) => (value.length < 11 ? 'дд.мм.гггг' : 'дд.мм.гггг - дд.мм.гггг'));
        }}
        className="btn btn-secondary mt-2 me-3 rounded-2"
      >
        Очистить
      </button>
      <button
        onClick={() => {
          setIsShowDatepicker(false);
        }}
        className="btn btn-primary mt-2 rounded-2"
      >
        Установить
      </button>
    </div>
  );
};
