import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getStringDateFromDateState = (dateState: DateStateType): string => {
  const day = dateState.day ? Math.min(Math.max(dateState.day, 1), 31).toString().padStart(2, '0') : 'дд';
  const month = dateState.month ? Math.min(Math.max(dateState.month, 1), 12).toString().padStart(2, '0') : 'мм';
  const year = dateState.year ? Math.min(Math.max(dateState.year, 1), 9999).toString().padStart(4, '0') : 'гггг';

  return `${day}.${month}.${year}`;
};
