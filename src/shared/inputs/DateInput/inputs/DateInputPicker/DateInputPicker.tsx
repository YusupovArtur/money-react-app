import { Dispatch, FC, SetStateAction, TouchEvent, useRef, useState } from 'react';
// Picker
import { DatePickerLabel } from './components/DatePickerModalLabel.tsx';
import { DatePickerControlButtons } from './components/DatePickerControlButtons.tsx';
import { DatePickerDayOptions } from './components/DatePickerDayOptions/DatePickerDayOptions.tsx';
import { DatePickerMonthOptions } from './components/DatePickerMonthOptions/DatePickerMonthOptions.tsx';
import { DatePickerYearOptions } from './components/DatePickerYearOptions/DatePickerYearOptions.tsx';
import { DatePickerModalControlButtons } from './components/DatePickerModalControlButtons.tsx';
// Helpers
import { decrementDisplayedOption } from './helpers/decrementDisplayedOption.ts';
import { incrementDisplayedOption } from './helpers/incrementDisplayedOption.ts';
// Types
import { DATE_PICKER_CELL_SIZE } from 'shared/inputs/DateInput/constants/constants.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';

interface DateInputDatePickerProps {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  setIsShowDatepicker: Dispatch<SetStateAction<boolean>>;
  isMobile?: boolean;
}

export const DateInputPicker: FC<DateInputDatePickerProps> = ({
  dateState,
  setDateState,
  setIsShowDatepicker,
  isMobile = false,
}) => {
  const [displayedOption, setDisplayedOption] = useState<Omit<DateStateType, 'day'>>({
    month: dateState.month ? dateState.month : new Date().getMonth() + 1,
    year: dateState.year ? dateState.year : new Date().getFullYear(),
  });
  const [displayedOptionType, setDisplayedOptionType] = useState<DateFieldName>('day');

  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (isMobile && displayedOptionType !== 'year' && event.touches.length === 1) {
      x.current = event.touches[0].clientX;
      y.current = event.touches[0].clientY;
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (
      isMobile &&
      displayedOptionType !== 'year' &&
      event.changedTouches.length === 1 &&
      x.current !== null &&
      y.current !== null
    ) {
      const dx: number = event.changedTouches[0].clientX - x.current;
      const dy: number = event.changedTouches[0].clientY - y.current;

      if (Math.abs(dx) > 1.5 * Math.abs(dy) && Math.abs(dx) > 70) {
        if (dx > 0) {
          incrementDisplayedOption({ displayedOptionType, displayedOption, setDisplayedOption });
        } else {
          decrementDisplayedOption({ displayedOptionType, displayedOption, setDisplayedOption });
        }
      }
    }
    x.current = null;
    y.current = null;
  };
  return (
    <div style={{ width: `${DATE_PICKER_CELL_SIZE * 7}rem` }} className="d-flex flex-column">
      {/*Label*/}
      {isMobile && <DatePickerLabel dateState={dateState} />}

      {/* Control */}
      <DatePickerControlButtons
        displayedOptionType={displayedOptionType}
        setDisplayedOptionType={setDisplayedOptionType}
        displayedOption={displayedOption}
        setDisplayedOption={setDisplayedOption}
      />

      {/* Options */}
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {displayedOptionType === 'day' ? (
          <DatePickerDayOptions dateState={dateState} setDateState={setDateState} displayedOption={displayedOption} />
        ) : displayedOptionType === 'month' ? (
          <DatePickerMonthOptions
            setDisplayedOptionType={setDisplayedOptionType}
            displayedOption={displayedOption}
            setDisplayedOption={setDisplayedOption}
          />
        ) : (
          displayedOptionType === 'year' && (
            <DatePickerYearOptions
              setDisplayedOptionType={setDisplayedOptionType}
              displayedOption={displayedOption}
              setDisplayedOption={setDisplayedOption}
            />
          )
        )}
      </div>

      {/* Modal control buttons */}
      {isMobile && <DatePickerModalControlButtons setDateState={setDateState} setIsShowDatepicker={setIsShowDatepicker} />}
    </div>
  );
};
