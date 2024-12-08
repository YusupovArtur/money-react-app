export const getToday = (): Date => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  return new Date(Date.UTC(year, month, day));
};
