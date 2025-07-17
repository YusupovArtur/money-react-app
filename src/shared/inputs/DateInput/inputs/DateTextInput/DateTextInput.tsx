import React, { Dispatch, FC, InputHTMLAttributes, SetStateAction, useRef } from 'react';
// Types
import { DateStateType } from '../../types/DateStateType.ts';
// Helpers
import { getStringDateFromDateState } from './helpers/getStringDateFromDateState.ts';
// UI
import { TextInput } from 'shared/inputs';
import { useDateTextInputHandlers } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputHandlers.ts';

interface DateTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  isModal?: boolean;
  setIsOpenedDatePicker?: (value: boolean | ((prev: boolean) => boolean)) => any;
  dateTextInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const DateTextInput: FC<DateTextInputProps> = ({
  dateState,
  setDateState,
  isModal = false,
  className,
  setIsOpenedDatePicker,
  dateTextInputRef: outerInputRef,
  ...props
}) => {
  const inputRef = outerInputRef || useRef<HTMLInputElement>(null);
  const { handleMouseUpAndDown, handleKeyDown, handleBlur, handlePreventDefault } = useDateTextInputHandlers({
    inputRef: inputRef,
    setDateState: setDateState,
    isModal: isModal,
  });

  const handleClickIsOpenedDatePicker = () => {
    if (setIsOpenedDatePicker && props.disabled !== true && isModal) setIsOpenedDatePicker((state) => !state);
  };

  return (
    <TextInput
      ref={inputRef}
      value={getStringDateFromDateState(dateState)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseUpAndDown}
      onMouseUp={handleMouseUpAndDown}
      onClick={handleClickIsOpenedDatePicker}
      onBlur={handleBlur}
      className={`rounded-start-0 ${className || ''}`}
      readOnly={isModal}
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
