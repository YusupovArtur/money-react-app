import { FC } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MONTH_FULL_NAMES } from 'shared/inputs/DateInput/constants/constants.ts';

export const DatePickerLabel: FC<{ dateState: DateStateType }> = ({ dateState }) => {
  const label =
    dateState.day && dateState.month && dateState.year
      ? `${dateState.day.toString()} ${MONTH_FULL_NAMES[dateState.month - 1]} ${dateState.year}`
      : '-- -- -- г';

  return (
    <div className="pb-3 px-2 text-body-emphasis" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
      {label}
    </div>
  );
};
