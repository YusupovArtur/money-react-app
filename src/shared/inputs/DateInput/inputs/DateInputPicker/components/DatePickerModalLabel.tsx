import { FC } from 'react';
import { DateStateRangeType, DateStateType, isDateState, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MONTH_NAMES_GENITIVE } from 'shared/inputs/DateInput/constants/constants.ts';
import { getStringDateFromDateState } from 'shared/inputs/DateInput/inputs/DateTextInput/helpers/getStringDateFromDateState.ts';

const getLabel = (dateState: DateStateType, short: boolean = false): string => {
  if (short) {
    return dateState.day && dateState.month && dateState.year ? getStringDateFromDateState(dateState) : '-- -- -- г';
  }

  return dateState.day && dateState.month && dateState.year
    ? `${dateState.day.toString()} ${MONTH_NAMES_GENITIVE[dateState.month - 1]} ${dateState.year}`
    : '-- -- -- г';
};

export const DatePickerLabel: FC<{ dateState: DateStateType | DateStateRangeType }> = ({ dateState }) => {
  let label = '';

  if (isDateState(dateState)) {
    label = getLabel(dateState);
  }

  if (isDateStateRange(dateState)) {
    label = `${getLabel(dateState[1], true)} по ${getLabel(dateState[2], true)}`;
  }

  return (
    <div className="pb-3 px-2 text-body-emphasis" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
      {label}
    </div>
  );
};
