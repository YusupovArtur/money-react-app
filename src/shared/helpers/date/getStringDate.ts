import { DateUTC } from 'shared/helpers';

export const getStringDate = (date: Date | number): string => {
  if (typeof date === 'number' && isNaN(date)) {
    return 'Ошибка: NaN';
  }

  const timestamp = typeof date === 'number' ? date : date.getTime();
  const dateObject = new DateUTC(timestamp);

  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear().toString();

  return `${day}.${month}.${year}`;
};
