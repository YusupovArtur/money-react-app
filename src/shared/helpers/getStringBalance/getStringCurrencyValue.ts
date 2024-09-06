export const getStringCurrencyValue = (props: { value: number; sign?: 'positive' | 'negative'; currency?: string }): string => {
  const { value, sign, currency = '₽' } = props;
  const stringValue = (sign ? (sign === 'positive' ? Math.abs(value) : -Math.abs(value)) : value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .replace('.', ',');

  return `${sign === 'positive' ? '+' : ''}${stringValue} ${currency}`;
};
