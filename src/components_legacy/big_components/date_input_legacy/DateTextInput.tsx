import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useRef } from 'react';
import {
  getDateInputNewValue,
  getDeviceType,
  getValidatedDateInputValue,
  getZonesNewNumberValue,
  getZonesValuePadStart,
  setDateInputSelection,
} from './functions';

const DateTextInput: FC<{
  dateInputValue: string;
  setDateInputValue: Dispatch<SetStateAction<string>>;
  isPeriod?: boolean;
  deviseType?: 'desktop' | 'mobile';
}> = ({ dateInputValue, setDateInputValue, isPeriod = false, deviseType }) => {
  // For text field
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const selectedZoneRef = useRef<number>(0);
  const isDeviceMobile = deviseType === 'mobile' ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;

  useEffect(() => {
    setDateInputSelection(dateInputRef, selectedZoneRef.current);
  });

  // Set date input value
  function setDateInputValueByKey(event: KeyboardEvent<HTMLInputElement>) {
    const zoneNumberValue = getZonesNewNumberValue(dateInputValue, event.key, selectedZoneRef.current);
    const zoneStringValue = getZonesValuePadStart(zoneNumberValue, selectedZoneRef.current);
    const zone_copy = selectedZoneRef.current;
    setDateInputValue((value) => getDateInputNewValue(zoneStringValue, value, zone_copy, isPeriod));

    if (event.key >= '0' && event.key <= '9') {
      switch (selectedZoneRef.current > 3 ? selectedZoneRef.current - 3 : selectedZoneRef.current) {
        case 1:
          if (zoneNumberValue >= 4) selectedZoneRef.current++;
          break;
        case 2:
          if (zoneNumberValue >= 2) selectedZoneRef.current++;
          break;
        case 3:
          if (zoneNumberValue >= 999 && isPeriod) selectedZoneRef.current++;
          break;
      }
      if (isPeriod) {
        if (selectedZoneRef.current > 6) selectedZoneRef.current = 6;
      } else if (selectedZoneRef.current > 3) selectedZoneRef.current = 3;
      setDateInputSelection(dateInputRef, selectedZoneRef.current);
    }
  }

  // Clear date input value
  const clearDateInputValue = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      switch (selectedZoneRef.current > 3 ? selectedZoneRef.current - 3 : selectedZoneRef.current) {
        case 1:
          setDateInputValue((value) => getDateInputNewValue('дд', value, selectedZoneRef.current, isPeriod));
          break;
        case 2:
          setDateInputValue((value) => getDateInputNewValue('мм', value, selectedZoneRef.current, isPeriod));
          break;
        case 3:
          setDateInputValue((value) => getDateInputNewValue('гггг', value, selectedZoneRef.current, isPeriod));
          break;
      }
    } else if (event.key === 'Delete') {
      if (isPeriod) setDateInputValue('дд.мм.гггг - дд.мм.гггг');
      else setDateInputValue('дд.мм.гггг');
    }
  };

  // Set date input selection
  const setDateInputSelectionByMouse = () => {
    if (dateInputRef.current && dateInputRef.current.selectionStart) {
      const selectionStart = dateInputRef.current.selectionStart;
      if (selectionStart >= 0 && selectionStart < 3) selectedZoneRef.current = 1;
      else if (selectionStart >= 3 && selectionStart < 6) selectedZoneRef.current = 2;
      else if (selectionStart >= 6 && selectionStart < 12) selectedZoneRef.current = 3;
      else if (selectionStart >= 12 && selectionStart < 16) selectedZoneRef.current = 4;
      else if (selectionStart >= 16 && selectionStart < 19) selectedZoneRef.current = 5;
      else if (selectionStart >= 19 && selectionStart <= 23) selectedZoneRef.current = 6;
      setDateInputSelection(dateInputRef, selectedZoneRef.current);
    }
  };

  const setDateInputSelectionByKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft' && selectedZoneRef.current > 1) selectedZoneRef.current = selectedZoneRef.current - 1;
    else if (event.key === 'ArrowRight') {
      if (!isPeriod && selectedZoneRef.current < 3) selectedZoneRef.current = selectedZoneRef.current + 1;
      if (isPeriod && selectedZoneRef.current < 6) selectedZoneRef.current = selectedZoneRef.current + 1;
    } else if (event.key === 'Enter') {
      selectedZoneRef.current = selectedZoneRef.current + 1;
      if (isPeriod) {
        if (selectedZoneRef.current > 6) selectedZoneRef.current = 1;
      } else if (selectedZoneRef.current > 3) selectedZoneRef.current = 1;
    }
    setDateInputSelection(dateInputRef, selectedZoneRef.current);
  };

  return (
    <input
      type="text"
      className="form-control"
      ref={dateInputRef}
      value={dateInputValue}
      readOnly={isDeviceMobile}
      onKeyDown={(event) => {
        event.preventDefault();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Enter')
          setDateInputSelectionByKeyboard(event);
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || (event.key >= '0' && event.key <= '9'))
          setDateInputValueByKey(event);
        if (event.key === 'Delete' || event.key === 'Backspace') clearDateInputValue(event);
      }}
      onFocus={setDateInputSelectionByMouse}
      onClick={() => {
        if (!isDeviceMobile) setDateInputSelectionByMouse();
      }}
      onMouseUp={setDateInputSelectionByMouse}
      onMouseDown={setDateInputSelectionByMouse}
      onBlur={() => setDateInputValue((value) => getValidatedDateInputValue(value))}
      onSelect={(event) => event.preventDefault()}
      onDoubleClick={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      onDragEnd={(event) => event.preventDefault()}
      spellCheck={false}
      onChange={() => {}}
    />
  );
};

export default DateTextInput;
