import { Dispatch, RefObject, SetStateAction } from 'react';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getSelectionByMouse } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getSelectionByMouse.ts';
import { setDateInputSelection } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/setDateInputSelection.ts';
import { getClearedDateState } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getClearedDateState.ts';
import { getSelectionByKeyboard } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getSelectionByKeyboard.ts';
import {
  getNewDateStateFieldValueByAdjust,
  getNewDateStateFieldValueByKeyboard,
} from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getNewDateStateFieldValue.ts';
import { DigitChar } from 'shared/helpers';
import {
  getValidDateStateRange,
  getValidDateState,
} from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getValidDateState.ts';
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

type DateTextInputActions =
  | { type: 'setSelectionByMouse' }
  | { type: 'setSelectionByKeyBoard'; payload: 'ArrowLeft' | 'ArrowRight' }
  | { type: 'clear'; payload: 'Delete' | 'Backspace' }
  | { type: 'adjustDateState'; payload: 'ArrowUp' | 'ArrowDown' }
  | { type: 'setDateStateByDigitKey'; payload: DigitChar }
  | { type: 'blur' };

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

type PropsType = { inputRef: RefObject<HTMLInputElement | null>; selectionRef: RefObject<DateInputSelectionType> } & (
  | PropsWithDate
  | PropsWithDateRange
);

export const useDateTextInputReducer = (props: PropsType) => {
  const { dateState, dateStateRange, setDateState, setDateStateRange, inputRef, selectionRef } = props;
  const type: 'date' | 'range' = setDateState ? 'date' : 'range';

  return (action: DateTextInputActions) => {
    switch (action.type) {
      case 'setSelectionByMouse':
        requestAnimationFrame(() => {
          selectionRef.current = getSelectionByMouse({ inputRef: inputRef });
          setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
        });
        break;

      case 'setSelectionByKeyBoard':
        selectionRef.current = getSelectionByKeyboard({ key: action.payload, selection: selectionRef.current, type: type });
        setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
        break;

      case 'clear':
        if (setDateState) {
          setDateState((state) =>
            getClearedDateState({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            }),
          );
        }
        if (setDateStateRange) {
          setDateStateRange((state) =>
            getClearedDateState({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            }),
          );
        }
        break;

      case 'adjustDateState':
        if (setDateState) {
          setDateState((state) => {
            const newFieldValue = getNewDateStateFieldValueByAdjust({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            });
            return { ...state, [selectionRef.current.key]: newFieldValue };
          });
        }

        if (setDateStateRange) {
          setDateStateRange((state) => {
            const newFieldValue = getNewDateStateFieldValueByAdjust({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            });
            return {
              ...state,
              [selectionRef.current.part]: { ...state[selectionRef.current.part], [selectionRef.current.key]: newFieldValue },
            };
          });
        }
        break;

      case 'setDateStateByDigitKey':
        const fieldValue = getNewDateStateFieldValueByKeyboard({
          key: action.payload,
          dateState: dateState ?? dateStateRange,
          selection: selectionRef.current,
        });

        if (setDateState) {
          setDateState((state) => {
            const newFieldValue = getNewDateStateFieldValueByKeyboard({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            });
            return { ...state, [selectionRef.current.key]: newFieldValue };
          });
        }

        if (setDateStateRange) {
          setDateStateRange((state) => {
            const newFieldValue = getNewDateStateFieldValueByKeyboard({
              key: action.payload,
              dateState: state,
              selection: selectionRef.current,
            });
            return {
              ...state,
              [selectionRef.current.part]: { ...state[selectionRef.current.part], [selectionRef.current.key]: newFieldValue },
            };
          });
        }

        if (selectionRef.current.key === 'day' && fieldValue >= 4) {
          requestAnimationFrame(() => {
            selectionRef.current = getSelectionByKeyboard({ key: 'ArrowRight', selection: selectionRef.current, type: type });
            setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
          });
        } else {
          if (selectionRef.current.key === 'month' && fieldValue >= 2) {
            requestAnimationFrame(() => {
              selectionRef.current = getSelectionByKeyboard({ key: 'ArrowRight', selection: selectionRef.current, type: type });
              setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
            });
          }
        }
        break;

      case 'blur':
        if (setDateState) {
          setDateState((state) => getValidDateState(state));
        }
        if (setDateStateRange) {
          setDateStateRange((state) => getValidDateStateRange(state));
        }
        break;
    }
  };
};
