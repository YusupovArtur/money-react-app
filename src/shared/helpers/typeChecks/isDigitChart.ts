export type DigitChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export const isDigitChar = (key: string): key is DigitChar => /^[0-9]$/.test(key);
