export const getStringBalance = (sum: number): string => {
  return sum
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .replace('.', ',');
};
