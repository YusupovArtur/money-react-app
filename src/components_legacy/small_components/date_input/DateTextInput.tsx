import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useRef } from 'react';
import {
  getDeviceType,
  getStringDateFromDateState,
  getTimestampFromDateState,
  getUpdatedByKeyDateStatePart,
  getValidatedDateStateValue,
  setDateInputSelection,
} from './functions.ts';
import { dateStateType } from './types.ts';

const DateTextInput: FC<{
  dateState: dateStateType;
  setDateState: Dispatch<SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
  deviseType?: 'desktop' | 'mobile';
}> = ({ dateState, setDateState, setTimestampFunction, deviseType }) => {
  // For text field
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const selectedPartRef = useRef<'day' | 'month' | 'year'>('day');
  const isDeviceMobile = deviseType === 'mobile' ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;

  useEffect(() => {
    setDateInputSelection(dateInputRef, selectedPartRef.current);
  });

  // Set date input value
  function setDateInputValueByKey(event: KeyboardEvent<HTMLInputElement>) {
    const newDateStatePart = getUpdatedByKeyDateStatePart(dateState, event.key, selectedPartRef.current);
    switch (selectedPartRef.current) {
      case 'day':
        setDateState((state) => {
          if (setTimestampFunction) setTimestampFunction(getTimestampFromDateState({ ...state, day: newDateStatePart }));
          return { ...state, day: newDateStatePart };
        });
        break;
      case 'month':
        setDateState((state) => {
          if (setTimestampFunction) setTimestampFunction(getTimestampFromDateState({ ...state, month: newDateStatePart }));
          return { ...state, month: newDateStatePart };
        });
        break;
      case 'year':
        setDateState((state) => {
          if (setTimestampFunction) setTimestampFunction(getTimestampFromDateState({ ...state, year: newDateStatePart }));
          return { ...state, year: newDateStatePart };
        });
        break;
    }

    if (event.key.match(/\d/g)) {
      switch (selectedPartRef.current) {
        case 'day':
          if (newDateStatePart >= 4) selectedPartRef.current = 'month';
          break;
        case 'month':
          if (newDateStatePart >= 2) selectedPartRef.current = 'year';
          break;
      }
      setDateInputSelection(dateInputRef, selectedPartRef.current);
    }
  }

  // Clear date input value
  const clearDateStateValue = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      switch (selectedPartRef.current) {
        case 'day':
          setDateState((state) => {
            if (setTimestampFunction) setTimestampFunction(NaN);
            return { ...state, day: 0 };
          });
          break;
        case 'month':
          setDateState((state) => {
            if (setTimestampFunction) setTimestampFunction(NaN);
            return { ...state, month: 0 };
          });
          break;
        case 'year':
          setDateState((state) => {
            if (setTimestampFunction) setTimestampFunction(NaN);
            return { ...state, year: 0 };
          });
          break;
      }
    } else if (event.key === 'Delete') {
      setDateState(() => {
        if (setTimestampFunction) setTimestampFunction(NaN);
        return { day: 0, month: 0, year: 0 };
      });
    }
  };

  // Set date input selection
  const setDateInputSelectionByMouse = () => {
    if (dateInputRef.current && dateInputRef.current.selectionStart) {
      const selectionStart = dateInputRef.current.selectionStart;
      if (selectionStart >= 0 && selectionStart < 3) selectedPartRef.current = 'day';
      else if (selectionStart >= 3 && selectionStart < 6) selectedPartRef.current = 'month';
      else if (selectionStart >= 6 && selectionStart < 12) selectedPartRef.current = 'year';
      setDateInputSelection(dateInputRef, selectedPartRef.current);
    }
  };

  const setDateInputSelectionByKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowRight') {
      switch (selectedPartRef.current) {
        case 'day':
          selectedPartRef.current = 'month';
          break;
        case 'month':
          selectedPartRef.current = 'year';
          break;
      }
    } else if (event.key === 'ArrowLeft') {
      switch (selectedPartRef.current) {
        case 'month':
          selectedPartRef.current = 'day';
          break;
        case 'year':
          selectedPartRef.current = 'month';
          break;
      }
    }
    setDateInputSelection(dateInputRef, selectedPartRef.current);
  };

  return (
    <input
      type="text"
      className="form-control"
      ref={dateInputRef}
      value={getStringDateFromDateState(dateState)}
      readOnly={isDeviceMobile}
      onKeyDown={(event) => {
        event.preventDefault();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') setDateInputSelectionByKeyboard(event);
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key.match(/\d/g)) setDateInputValueByKey(event);
        if (event.key === 'Delete' || event.key === 'Backspace') clearDateStateValue(event);
      }}
      onFocus={setDateInputSelectionByMouse}
      onClick={() => {
        if (!isDeviceMobile) setDateInputSelectionByMouse();
      }}
      onMouseUp={setDateInputSelectionByMouse}
      // onMouseDown={setDateInputSelectionByMouse}
      onBlur={() =>
        setDateState((state) => {
          const validatedDateState = getValidatedDateStateValue(state);
          if (setTimestampFunction) setTimestampFunction(getTimestampFromDateState(validatedDateState));
          return validatedDateState;
        })
      }
      onSelect={(event) => {
        event.preventDefault();
        event.bubbles = false;
      }}
      onDoubleClick={(event) => {
        event.bubbles = false;
        event.preventDefault();
      }}
      onContextMenu={(event) => {
        event.bubbles = false;
        event.preventDefault();
      }}
      onDragStart={(event) => {
        event.bubbles = false;
        event.preventDefault();
      }}
      onDragEnd={(event) => {
        event.bubbles = false;
        event.preventDefault();
      }}
      spellCheck={false}
      onChange={() => {}}
    />
  );
};

export default DateTextInput;
