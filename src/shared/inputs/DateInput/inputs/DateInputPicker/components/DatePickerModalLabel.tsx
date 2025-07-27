import { FC } from 'react';
import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MONTH_FULL_NAMES, MONTH_GENITIVE_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';
import { getStringDateFromDateState } from 'shared/inputs/DateInput/inputs/DateTextInput/helpers/getStringDateFromDateState.ts';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { getMonthDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getMonthDateStateStretched.ts';
import { deepEqual } from 'shared/helpers';
import { getValidDateStateRange } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getYearDateStateStretched } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/helpers/getYearDateStateStretched.ts';

export const DatePickerLabel: FC<{ dateState: DateStateType | DateStateRangeType }> = ({ dateState }) => {
  const { state } = useDatePickerContext();
  return (
    <div className="pb-3 px-2 text-body-emphasis" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
      {getDateStateLabel({ dateState: dateState, rangeLevel: state.rangeLevel })}
    </div>
  );
};

const getDateStateLabel = (props: { dateState: DateStateType | DateStateRangeType; rangeLevel: keyof DateStateType }): string => {
  const { dateState, rangeLevel } = props;

  if (isDateState(dateState)) {
    return dateState.day && dateState.month && dateState.year
      ? `${dateState.day.toString()} ${MONTH_GENITIVE_NAMES[dateState.month - 1]} ${dateState.year}`
      : '-- -- -- г';
  } else {
    const validRange = getValidDateStateRange(dateState);
    const timestamp1 = getTimestampFromDateState(validRange[1]);
    const timestamp2 = getTimestampFromDateState(validRange[2]);

    if (rangeLevel === 'day') {
      if (isNaN(timestamp1) && isNaN(timestamp2)) {
        return '-- -- -- г';
      }
      return `${
        dateState[1].day && dateState[1].month && dateState[1].year ? getStringDateFromDateState(dateState[1]) : '-- -- -- г'
      } - ${dateState[2].day && dateState[2].month && dateState[2].year ? getStringDateFromDateState(dateState[2]) : '-- -- -- г'}`;
    }

    if (rangeLevel === 'month') {
      if (!isNaN(timestamp1) && !isNaN(timestamp2)) {
        // noinspection DuplicatedCode
        const monthRange1 = getMonthDateStateStretched(validRange[1]);
        const monthRange2 = getMonthDateStateStretched(validRange[2]);

        if (deepEqual(monthRange1, validRange)) {
          return `за ${MONTH_FULL_NAMES[validRange[1].month - 1]} ${validRange[1].year}`;
        }

        if (deepEqual(monthRange1[1], validRange[1]) && deepEqual(monthRange2[2], validRange[2])) {
          return `${getStringDateFromDateState(validRange[1]).slice(3)}-${getStringDateFromDateState(validRange[2]).slice(3)}`;
        }

        return getDateStateLabel({ dateState: dateState, rangeLevel: 'day' });
      } else {
        return getDateStateLabel({ dateState: dateState, rangeLevel: 'day' });
      }
    }

    if (rangeLevel === 'year') {
      if (!isNaN(timestamp1) && !isNaN(timestamp2)) {
        // noinspection DuplicatedCode
        const yearRange1 = getYearDateStateStretched(validRange[1]);
        const yearRange2 = getYearDateStateStretched(validRange[2]);

        if (deepEqual(yearRange1, validRange)) {
          return `за ${validRange[1].year}`;
        }

        if (deepEqual(yearRange1[1], validRange[1]) && deepEqual(yearRange2[2], validRange[2])) {
          return `${validRange[1].year}-${validRange[2].year}`;
        }

        return getDateStateLabel({ dateState: dateState, rangeLevel: 'month' });
      } else {
        return getDateStateLabel({ dateState: dateState, rangeLevel: 'month' });
      }
    }
  }
  return '-- -- -- г';
};
