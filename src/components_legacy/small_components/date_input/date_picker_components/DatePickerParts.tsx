import { Dispatch, FC, SetStateAction } from 'react';
import { decrementCalendar, incrementCalendar } from '../../../small_components/date_input/date_picker_components/functions';
import { ChevronLeftIconSVG, ChevronRightIconSVG } from '../../../small_components/icons_svg/IconsSVG';
import { DATE_PICKER_CELL_SIZE, MONTH_ABBREVIATED_NAMES, MONTH_FULL_NAMES } from '../../../small_components/date_input/constants';
import { dateStateType } from '../../../small_components/date_input/types';

export const DatePickerLabel: FC<{ dateState: dateStateType }> = ({ dateState }) => {
  const label =
    dateState.day && dateState.month && dateState.year
      ? `${dateState.day.toString()} ${MONTH_FULL_NAMES[dateState.month - 1]} ${dateState.year}`
      : '-- -- -- г';
  return (
    <div className="py-3 px-2 text-body-emphasis" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
      {label}
    </div>
  );
};

export const DatePickerCalendarButtons: FC<{
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  displayedField: 'month' | 'day' | 'year';
  setDisplayedField: Dispatch<SetStateAction<'month' | 'day' | 'year'>>;
}> = ({ currentMonth, setCurrentMonth, currentYear, setCurrentYear, displayedField, setDisplayedField }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-center align-items-stretch text-body-emphasis">
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
      <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={() => decrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center rounded"
        >
          <ChevronLeftIconSVG iconSize="1rem" />
        </button>
        <button
          onClick={() => incrementCalendar(displayedField, currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
          style={{ width: `${DATE_PICKER_CELL_SIZE}rem`, height: `${DATE_PICKER_CELL_SIZE}rem` }}
          className="btn btn-body d-flex align-items-center justify-content-center rounded"
        >
          <ChevronRightIconSVG iconSize="1rem" />
        </button>
      </div>
    </div>
  );
};

export const DatePickerModalButtons: FC<{
  setDateState: Dispatch<SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
  setIsShowDatepicker: Dispatch<SetStateAction<boolean>>;
}> = ({ setDateState, setTimestampFunction, setIsShowDatepicker }) => {
  return (
    <div className="d-flex justify-content-end">
      <button
        onClick={() => {
          if (setTimestampFunction) setTimestampFunction(NaN);
          setDateState({ day: 0, month: 0, year: 0 });
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
