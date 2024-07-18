import { MutableRefObject } from 'react';
import { MAX_YEAR, MIN_YEAR, MONTH_FULL_NAMES, MONTH_SHORT_NAMES } from './constants.ts';

export const getDeviceType = (): 'mobile' | 'desktop' => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
  if (isMobile) return 'mobile';
  else return 'desktop';
};

// For date input datepicker
export const getMobileDatePickersLabel = (dateInputsValue: string): string => {
  if (dateInputsValue.length < 11) {
    if (getIsDateCorrect(dateInputsValue)) {
      const day = getZonesNumberValue(dateInputsValue, 1, '0');
      const month = getZonesNumberValue(dateInputsValue, 2, '0');
      const year = getZonesNumberValue(dateInputsValue, 3, '0');
      return `${day} ${MONTH_FULL_NAMES[month - 1]} ${year}`;
    } else return '-- -- -- г';
  } else {
    const dateValue1 = dateInputsValue.substring(0, 10);
    const dateValue2 = dateInputsValue.substring(13, 23);
    const isDateValue1Correct = getIsDateCorrect(dateValue1);
    const isDateValue2Correct = getIsDateCorrect(dateValue2);
    if (!isDateValue1Correct && !isDateValue2Correct) {
      return '-- -- -- г -- -- -- г';
    } else {
      const day1 = getZonesNumberValue(dateValue1, 1, '0');
      const month1 = getZonesNumberValue(dateValue1, 2, '0');
      const year1 = getZonesNumberValue(dateValue1, 3, '0');
      if (isDateValue1Correct && !isDateValue2Correct) {
        return `${day1} ${MONTH_SHORT_NAMES[month1 - 1]} ${year1} -- -- -- г`;
      } else {
        const day2 = getZonesNumberValue(dateValue2, 1, '0');
        const month2 = getZonesNumberValue(dateValue2, 2, '0');
        const year2 = getZonesNumberValue(dateValue2, 3, '0');
        if (year1 === year2) {
          if (month1 === month2) {
            return `${day1} - ${day2} ${MONTH_SHORT_NAMES[month1 - 1]} ${year1}`;
          } else return `${day1} ${MONTH_SHORT_NAMES[month1 - 1]} - ${day2} ${MONTH_SHORT_NAMES[month2 - 1]} ${year1}`;
        } else return `${day1} ${MONTH_SHORT_NAMES[month1 - 1]} ${year1} - ${day2} ${MONTH_SHORT_NAMES[month2 - 1]} ${year2}`;
      }
    }
  }
};

const getDateObjectFromStringDate = (date: string): Date => {
  return new Date(`${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}T00:00:00`);
};

export const getDatePickerNewValue = (dateInputsValue: string, newValue: string): string => {
  if (dateInputsValue.length < 11) {
    if (dateInputsValue === newValue) return 'дд.мм.гггг';
    else return newValue;
  } else {
    const isDateValueCorrect1: boolean = getIsDateCorrect(dateInputsValue.substring(0, 10));
    const isDateValueCorrect2: boolean = getIsDateCorrect(dateInputsValue.substring(13, 23));
    let dateValue1 = dateInputsValue.substring(0, 10);
    let dateValue2 = dateInputsValue.substring(13, 23);
    if (dateValue1 === newValue && dateValue2 === newValue) {
      dateValue1 = 'дд.мм.гггг';
      dateValue2 = 'дд.мм.гггг';
    } else if (dateValue1 === newValue) dateValue1 = 'дд.мм.гггг';
    else if (dateValue2 === newValue) dateValue2 = 'дд.мм.гггг';
    else if (!isDateValueCorrect1) dateValue1 = newValue;
    else if (isDateValueCorrect1 && !isDateValueCorrect2) dateValue2 = newValue;
    else if (isDateValueCorrect1 && isDateValueCorrect2) {
      dateValue1 = newValue;
      dateValue2 = 'дд.мм.гггг';
    }
    return getSortedDateInputValue(`${dateValue1} - ${dateValue2}`);
  }
};

// For date text input
const getZonesStringValue = (dateInputsValue: string, selectedZone: number): string => {
  switch (selectedZone) {
    case 1:
      return dateInputsValue.substring(0, 2);
    case 2:
      return dateInputsValue.substring(3, 5);
    case 3:
      return dateInputsValue.substring(6, 10);
    case 4:
      return dateInputsValue.substring(13, 15);
    case 5:
      return dateInputsValue.substring(16, 18);
    case 6:
      return dateInputsValue.substring(19, 23);
    default:
      return '';
  }
};

const getZonesNumberValue = (dateInputsValue: string, selectedZone: number, ifNotNumber: '0' | 'presentDay'): number => {
  const zonesStringValue: string = getZonesStringValue(dateInputsValue, selectedZone);
  switch (selectedZone > 3 ? selectedZone - 3 : selectedZone) {
    case 1:
      return zonesStringValue === 'дд' ? (ifNotNumber === '0' ? 0 : new Date().getDate()) : parseInt(zonesStringValue);
    case 2:
      return zonesStringValue === 'мм' ? (ifNotNumber === '0' ? 0 : new Date().getMonth() + 1) : parseInt(zonesStringValue);
    case 3:
      return zonesStringValue === 'гггг' ? (ifNotNumber === '0' ? 0 : new Date().getFullYear()) : parseInt(zonesStringValue);
    default:
      return -1;
  }
};

export const getZonesValuePadStart = (zonesValue: string | number, selectedZone: number): string => {
  const newStringValue = zonesValue.toString();

  switch (selectedZone > 3 ? selectedZone - 3 : selectedZone) {
    case 1:
      return newStringValue.padStart(2, '0');
    case 2:
      return newStringValue.padStart(2, '0');
    case 3:
      return newStringValue.padStart(4, '0');
    default:
      return '';
  }
};

export const getZonesNewNumberValue = (dateInputsValue: string, pressedKey: string, selectedZone: number): number => {
  const isPressedNumber: boolean = pressedKey >= '0' && pressedKey <= '9';
  const isPressedArrow: boolean = pressedKey === 'ArrowUp' || pressedKey === 'ArrowDown';
  if (isPressedNumber) {
    let zoneNumberValue: number = getZonesNumberValue(dateInputsValue, selectedZone, '0');
    const zoneStringValue: string = getZonesValuePadStart(zoneNumberValue.toString() + pressedKey, selectedZone);
    zoneNumberValue = parseInt(zoneStringValue);
    switch (selectedZone > 3 ? selectedZone - 3 : selectedZone) {
      case 1:
        if (zoneNumberValue > 31) return parseInt(pressedKey.padStart(2, '0'));
        break;
      case 2:
        if (zoneNumberValue > 12) return parseInt(pressedKey.padStart(2, '0'));
        break;
      case 3:
        if (zoneNumberValue > 9999) return parseInt(pressedKey.padStart(4, '0'));
        break;
    }
    return zoneNumberValue;
  } else if (isPressedArrow) {
    let zoneNumberValue: number = getZonesNumberValue(dateInputsValue, selectedZone, 'presentDay');
    const zoneStringValue: string = getZonesStringValue(dateInputsValue, selectedZone);
    if (zoneStringValue !== 'дд' && zoneStringValue !== 'мм' && zoneStringValue !== 'гггг') {
      if (pressedKey === 'ArrowUp') zoneNumberValue += 1;
      else if (pressedKey === 'ArrowDown') zoneNumberValue -= 1;
    }
    switch (selectedZone > 3 ? selectedZone - 3 : selectedZone) {
      case 1:
        if (zoneNumberValue < 1) zoneNumberValue = 31;
        if (zoneNumberValue > 31) zoneNumberValue = 1;
        break;
      case 2:
        if (zoneNumberValue < 1) zoneNumberValue = 12;
        if (zoneNumberValue > 12) zoneNumberValue = 1;
        break;
      case 3:
        if (zoneNumberValue < MIN_YEAR) zoneNumberValue = MIN_YEAR;
        if (zoneNumberValue > MAX_YEAR) zoneNumberValue = MAX_YEAR;
        break;
    }
    return zoneNumberValue;
  }
  return 0;
};

export const getDateInputNewValue = (
  newZonesValue: string | number,
  dateInputsValue: string,
  selectedZone: number,
  isPeriod: boolean = false,
): string => {
  const newStringValue: string = getZonesValuePadStart(newZonesValue, selectedZone);
  if (isPeriod) {
    switch (selectedZone) {
      case 1:
        return `${newStringValue}${dateInputsValue.substring(2, 23)}`;
      case 2:
        return `${dateInputsValue.substring(0, 3)}${newStringValue}${dateInputsValue.substring(5, 23)}`;
      case 3:
        return `${dateInputsValue.substring(0, 6)}${newStringValue}${dateInputsValue.substring(10, 23)}`;
      case 4:
        return `${dateInputsValue.substring(0, 13)}${newStringValue}${dateInputsValue.substring(15, 23)}`;
      case 5:
        return `${dateInputsValue.substring(0, 16)}${newStringValue}${dateInputsValue.substring(18, 23)}`;
      case 6:
        return `${dateInputsValue.substring(0, 19)}${newStringValue}`;
    }
  } else {
    switch (selectedZone) {
      case 1:
        return `${newStringValue}${dateInputsValue.substring(2, 10)}`;
      case 2:
        return `${dateInputsValue.substring(0, 3)}${newStringValue}${dateInputsValue.substring(5, 10)}`;
      case 3:
        return `${dateInputsValue.substring(0, 6)}${newStringValue}`;
    }
  }
  return '';
};

export const setDateInputSelection = (dateInputsRef: MutableRefObject<HTMLInputElement | null>, selectedZone: number): void => {
  if (selectedZone > 0 && dateInputsRef.current && dateInputsRef.current.selectionStart && dateInputsRef.current.selectionEnd) {
    switch (selectedZone) {
      case 1:
        dateInputsRef.current.selectionStart = 0;
        dateInputsRef.current.selectionEnd = 2;
        break;
      case 2:
        dateInputsRef.current.selectionStart = 3;
        dateInputsRef.current.selectionEnd = 5;
        break;
      case 3:
        dateInputsRef.current.selectionStart = 6;
        dateInputsRef.current.selectionEnd = 10;
        break;
      case 4:
        dateInputsRef.current.selectionStart = 13;
        dateInputsRef.current.selectionEnd = 15;
        break;
      case 5:
        dateInputsRef.current.selectionStart = 16;
        dateInputsRef.current.selectionEnd = 18;
        break;
      case 6:
        dateInputsRef.current.selectionStart = 19;
        dateInputsRef.current.selectionEnd = 23;
        break;
    }
  }
};

// For date input validation
export const getIsDateCorrect = (dateInputsValue: string): boolean => {
  if (dateInputsValue.length < 11) {
    return (
      getZonesStringValue(dateInputsValue, 1) !== 'дд' &&
      getZonesStringValue(dateInputsValue, 2) !== 'мм' &&
      getZonesStringValue(dateInputsValue, 3) !== 'гггг'
    );
  } else {
    return (
      getZonesStringValue(dateInputsValue, 1) !== 'дд' &&
      getZonesStringValue(dateInputsValue, 2) !== 'мм' &&
      getZonesStringValue(dateInputsValue, 3) !== 'гггг' &&
      getZonesStringValue(dateInputsValue, 4) !== 'дд' &&
      getZonesStringValue(dateInputsValue, 5) !== 'мм' &&
      getZonesStringValue(dateInputsValue, 6) !== 'гггг'
    );
  }
};

export const getMonthsMaxDate = (month: number, year: number): number => {
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) return 31;
  else if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
  else if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 29;
  else return 28;
};

const getValidatedDateValue = (dateInputsValue: string): string => {
  if (getIsDateCorrect(dateInputsValue)) {
    const stringDay = getZonesStringValue(dateInputsValue, 1);
    const stringMonth = getZonesStringValue(dateInputsValue, 2);
    const stringYear = getZonesStringValue(dateInputsValue, 3);

    let numberYear = parseInt(stringYear);
    numberYear = numberYear > MAX_YEAR ? MAX_YEAR : numberYear;
    numberYear = numberYear < MIN_YEAR ? MIN_YEAR : numberYear;

    const numberMonth = parseInt(stringMonth);
    let numberDay = parseInt(stringDay);
    const maxMonthDay: number = getMonthsMaxDate(numberMonth, numberYear);
    numberDay = numberDay > maxMonthDay ? maxMonthDay : numberDay;

    return `${numberDay.toString().padStart(2, '0')}.${numberMonth.toString().padStart(2, '0')}.${numberYear
      .toString()
      .padStart(4, '0')}`;
  } else return dateInputsValue;
};

const getSortedDateInputValue = (dateInputsValue: string): string => {
  const dateStringValue1 = getValidatedDateValue(dateInputsValue.substring(0, 10));
  const dateStringValue2 = getValidatedDateValue(dateInputsValue.substring(13, 23));
  const isDateValueCorrect1 = getIsDateCorrect(dateStringValue1);
  const isDateValueCorrect2 = getIsDateCorrect(dateStringValue2);
  if (!isDateValueCorrect1 && !isDateValueCorrect2) return `${dateStringValue1} - ${dateStringValue2}`;
  else if (isDateValueCorrect1 && !isDateValueCorrect2) return `${dateStringValue1} - ${dateStringValue2}`;
  else if (!isDateValueCorrect1 && isDateValueCorrect2) return `${dateStringValue2} - ${dateStringValue1}`;
  else if (getDateObjectFromStringDate(dateStringValue1).getTime() < getDateObjectFromStringDate(dateStringValue2).getTime())
    return `${dateStringValue1} - ${dateStringValue2}`;
  else return `${dateStringValue2} - ${dateStringValue1}`;
};

export const getValidatedDateInputValue = (dateInputsValue: string): string => {
  if (dateInputsValue.length < 11) return getValidatedDateValue(dateInputsValue);
  else return getSortedDateInputValue(dateInputsValue);
};
