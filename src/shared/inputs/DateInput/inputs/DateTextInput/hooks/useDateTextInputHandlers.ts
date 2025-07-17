import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import {
  Dispatch,
  DragEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import { setDateInputSelection } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/setDateInputSelection.ts';
import { useDateTextInputReducer } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/useDateTextInputReducer.ts';
import { isDigitChar } from 'shared/helpers';

export const useDateTextInputHandlers = (props: {
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  inputRef: RefObject<HTMLInputElement | null>;
  isModal: boolean;
}) => {
  const { setDateState, inputRef, isModal } = props;
  const selectedPartRef = useRef<keyof DateStateType>('day');

  const dispatch = useDateTextInputReducer({ setDateState: setDateState, inputRef: inputRef, selectionRef: selectedPartRef });

  useEffect(() => {
    setDateInputSelection({ inputRef: inputRef, selection: selectedPartRef.current });
  });

  // Handlers
  const handleMouseUpAndDown = () => {
    if (!isModal) dispatch({ type: 'setSelectionByMouse' });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log('KEYDOWN', event.key);
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      dispatch({ type: 'setSelectionByKeyBoard', payload: event.key });
    }

    if (isDigitChar(event.key)) {
      dispatch({ type: 'setDateStateByDigitKey', payload: event.key });
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      dispatch({ type: 'adjustDateState', payload: event.key });
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      dispatch({ type: 'clear', payload: event.key });
    }
  };

  const handleBlur = () => {
    dispatch({ type: 'blur' });
  };

  const handlePreventDefault = (
    event: SyntheticEvent<HTMLInputElement, Event> | ReactMouseEvent<HTMLInputElement, MouseEvent> | DragEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    event.bubbles = false;
  };

  return { handleMouseUpAndDown, handleKeyDown, handleBlur, handlePreventDefault };
};
