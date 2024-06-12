export const DATE_PICKER_CELL_SIZE: number = 2.5; // em

export const MIN_YEAR = 1980;
export const MAX_YEAR = 1980 + Math.ceil((2060 - MIN_YEAR + 1) / 4) * 4 - 1;

export const MONTH_SHORT_NAMES: string[] = ['Янв', 'Фев', 'Мар', 'Апр', 'май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
export const MONTH_ABBREVIATED_NAMES: string[] = [
  'Янв.',
  'Фев.',
  'Мар.',
  'Апр.',
  'Май.',
  'Июн.',
  'Июл.',
  'Авг.',
  'Сен.',
  'Окт.',
  'Ноя.',
  'Дек.',
];
export const DAY_SHORT_NAMES: string[] = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const MONTH_FULL_NAMES: string[] = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декебря',
];
export const DAY_FULL_NAMES: string[] = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
