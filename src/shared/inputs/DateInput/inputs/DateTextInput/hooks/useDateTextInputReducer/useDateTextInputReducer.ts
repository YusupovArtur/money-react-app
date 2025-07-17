import { Dispatch, RefObject, SetStateAction } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { getSelectionByMouse } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getSelectionByMouse.ts';
import { setDateInputSelection } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/setDateInputSelection.ts';
import { getClearedDateState } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getClearedDateState.ts';
import { getSelectionByKeyboard } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getSelectionByKeyboard.ts';
import {
  getNewDateStateFieldValueByAdjust,
  getNewDateStateFieldValueByKeyboard,
} from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/helpers/getNewDateStateFieldValue.ts';
import { DigitChar } from 'shared/helpers';
import { getValidatedDateStateValue } from 'shared/inputs/DateInput/inputs/DateTextInput/helpers/getValidatedDateStateValue.ts';

type DateTextInputActions =
  | { type: 'setSelectionByMouse' }
  | { type: 'setSelectionByKeyBoard'; payload: 'ArrowLeft' | 'ArrowRight' }
  | { type: 'clear'; payload: 'Delete' | 'Backspace' }
  | { type: 'adjustDateState'; payload: 'ArrowUp' | 'ArrowDown' }
  | { type: 'setDateStateByDigitKey'; payload: DigitChar }
  | { type: 'blur' };

export const useDateTextInputReducer = (props: {
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  inputRef: RefObject<HTMLInputElement | null>;
  selectionRef: RefObject<keyof DateStateType>;
}) => {
  const { setDateState, inputRef, selectionRef } = props;

  return (action: DateTextInputActions) => {
    switch (action.type) {
      case 'setSelectionByMouse':
        requestAnimationFrame(() => {
          selectionRef.current = getSelectionByMouse({ inputRef: inputRef });
          setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
        });
        break;

      case 'setSelectionByKeyBoard':
        selectionRef.current = getSelectionByKeyboard({ key: action.payload, selection: selectionRef.current });
        setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
        break;

      case 'clear':
        setDateState((state) => getClearedDateState({ key: action.payload, dateState: state, selection: selectionRef.current }));
        break;

      case 'adjustDateState':
        setDateState((state) => {
          const newDateStateFieldValue = getNewDateStateFieldValueByAdjust({
            key: action.payload,
            dateState: state,
            selectedPart: selectionRef.current,
          });
          const currentSelectedPart = selectionRef.current;

          return { ...state, [currentSelectedPart]: newDateStateFieldValue };
        });
        break;

      case 'setDateStateByDigitKey':
        let fieldValue = 0;

        setDateState((state) => {
          const newFieldValue = getNewDateStateFieldValueByKeyboard({
            key: action.payload,
            dateState: state,
            selectedPart: selectionRef.current,
          });
          fieldValue = newFieldValue;
          return { ...state, [selectionRef.current]: newFieldValue };
        });

        if (selectionRef.current === 'day' && fieldValue >= 4) {
          console.log('KEY MONTH');
          selectionRef.current = 'month';
        } else if (selectionRef.current === 'month' && fieldValue >= 2) {
          console.log('KEY YEAR');
          selectionRef.current = 'year';
        }
        setDateInputSelection({ inputRef: inputRef, selection: selectionRef.current });
        break;

      case 'blur':
        setDateState((state) => getValidatedDateStateValue(state));
        break;
    }
  };
};
