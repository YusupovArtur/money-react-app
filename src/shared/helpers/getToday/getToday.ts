export const getToday = (): number => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now.getTime();
};