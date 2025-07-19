import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
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
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

type PropsWithDate = {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  dateStateRange?: never;
  setDateStateRange?: never;
};

type PropsWithDateRange = {
  dateState?: never;
  setDateState?: never;
  dateStateRange: DateStateRangeType;
  setDateStateRange: Dispatch<SetStateAction<DateStateRangeType>>;
};

type PropsType = {
  inputRef: RefObject<HTMLInputElement | null>;
  isModal: boolean;
} & (PropsWithDate | PropsWithDateRange);

export const useDateTextInputHandlers = (props: PropsType) => {
  const { dateState, dateStateRange, setDateState, setDateStateRange, inputRef, isModal } = props;
  const selectedPartRef = useRef<DateInputSelectionType>({ part: 1, key: 'day' });

  const dispatch = setDateState
    ? useDateTextInputReducer({
        dateState: dateState,
        setDateState: setDateState,
        inputRef: inputRef,
        selectionRef: selectedPartRef,
      })
    : useDateTextInputReducer({
        dateStateRange: dateStateRange,
        setDateStateRange: setDateStateRange,
        inputRef: inputRef,
        selectionRef: selectedPartRef,
      });

  useEffect(() => {
    setDateInputSelection({ inputRef: inputRef, selection: selectedPartRef.current });
  });

  // Handlers
  const handleMouseUpAndDown = () => {
    if (!isModal) dispatch({ type: 'setSelectionByMouse' });
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
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

  return { handleMouseUpAndDown, handleKey, handleBlur, handlePreventDefault };
};
