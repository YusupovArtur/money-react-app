import { getToday } from './getToday.ts';

export const getTodayTimestamp = (): number => {
  const now = getToday();

  return now.getTime();
};
