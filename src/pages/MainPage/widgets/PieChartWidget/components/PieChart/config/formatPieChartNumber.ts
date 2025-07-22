export const formatPieChartNumber = (value: number, fractionDigits: number = 0): string =>
  new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
