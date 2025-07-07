import {
  Dispatch,
  DragEvent,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
// Types
import { DateStateType } from '../../types/DateStateType.ts';
import { DateFieldName } from '../../types/DateFieldName.ts';
// Helpers
import { getStringDateFromDateState } from './helpers/getStringDateFromDateState.ts';
import { setDateInputSelection } from './helpers/setDateInputSelection.ts';
import { getValidatedDateStateValue } from './helpers/getValidatedDateStateValue.ts';
import { setDateInputSelectionPartRefByKeyboard } from './helpers/setDateInputSelectionPartRefByKeyboard.ts';
import { setDateInputSelectionPartRefByMouse } from './helpers/setDateInputSelectionPartRefByMouse.ts';
import { getDateStateValueByClearKeys } from './helpers/getDateStateValueByClearKeys.ts';
import { getNewDateStateFieldValue } from './helpers/getNewDateStateFieldValue.ts';
// UI
import { TextInput } from 'shared/inputs';

interface DateTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  isMobile?: boolean;
}

export const DateTextInput: FC<DateTextInputProps> = ({ dateState, setDateState, isMobile = false, className, ...props }) => {
  // For text field
  const dateInputRef = useRef<HTMLInputElement>(null);
  const selectedPartRef = useRef<DateFieldName>('day');

  useEffect(() => {
    setDateInputSelection({ dateInputRef, selectedPart: selectedPartRef.current });
  });

  // Change input value
  const setDateInputValueByKey = (event: KeyboardEvent<HTMLInputElement>) => {
    setDateState((state) => {
      const newDateStateFieldValue = getNewDateStateFieldValue({
        key: event.key,
        dateState: state,
        selectedPart: selectedPartRef.current,
      });

      const currentSelectedPart = selectedPartRef.current;
      if (event.key.match(/\d/g)) {
        if (selectedPartRef.current === 'day' && newDateStateFieldValue >= 4) {
          selectedPartRef.current = 'month';
        } else if (selectedPartRef.current === 'month' && newDateStateFieldValue >= 2) {
          selectedPartRef.current = 'year';
        }
        setDateInputSelection({ dateInputRef, selectedPart: selectedPartRef.current });
      }

      return { ...state, [currentSelectedPart]: newDateStateFieldValue };
    });
  };

  // Clear date input
  const clearDateStateValue = (event: KeyboardEvent<HTMLInputElement>) => {
    setDateState((state) =>
      getDateStateValueByClearKeys({
        key: event.key,
        dateState: state,
        selectedPart: selectedPartRef.current,
      }),
    );
  };

  // Selection handlers
  const handleClick = () => {
    if (!isMobile) {
      requestAnimationFrame(() => {
        setDateInputSelectionPartRefByMouse({ dateInputRef, selectedPartRef });
        setDateInputSelection({ dateInputRef, selectedPart: selectedPartRef.current });
      });
    }
  };

  const setDateInputSelectionByKey = (event: KeyboardEvent<HTMLInputElement>) => {
    setDateInputSelectionPartRefByKeyboard({ key: event.key, selectedPartRef });
    setDateInputSelection({ dateInputRef, selectedPart: selectedPartRef.current });
  };

  // Handlers
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      setDateInputSelectionByKey(event);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key.match(/\d/g)) {
      setDateInputValueByKey(event);
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      clearDateStateValue(event);
    }
  };

  const handleBlur = () => {
    setDateState((state) => getValidatedDateStateValue(state));
  };

  const handlePreventDefault = (
    event: SyntheticEvent<HTMLInputElement, Event> | ReactMouseEvent<HTMLInputElement, MouseEvent> | DragEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    event.bubbles = false;
  };

  return (
    <TextInput
      ref={dateInputRef}
      value={getStringDateFromDateState(dateState)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleClick}
      onMouseUp={handleClick}
      onBlur={handleBlur}
      className={`rounded-start-0 ${className || ''}`}
      readOnly={isMobile}
      onSelect={handlePreventDefault}
      onDoubleClick={handlePreventDefault}
      onContextMenu={handlePreventDefault}
      onDragStart={handlePreventDefault}
      onDragEnd={handlePreventDefault}
      spellCheck={false}
      onChange={() => {}}
      {...props}
    />
  );
};
