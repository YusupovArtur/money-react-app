import React, { Dispatch, FC, InputHTMLAttributes, SetStateAction, useRef } from 'react';
// Types
import { DateStateRangeType, DateStateType } from '../../types/DateStateType.ts';
// Helpers
import { getStringDateFromDateState, getStringDateFromDateStateRange } from './helpers/getStringDateFromDateState.ts';
// UI
import { TextInput } from 'shared/inputs';
import { useDateTextInputHandlers } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputHandlers.ts';

type DateStateProps = {
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  dateStateRange?: never;
  setDateStateRange?: never;
};

type DateStateRangeProps = {
  dateState?: never;
  setDateState?: never;
  dateStateRange: DateStateRangeType;
  setDateStateRange: Dispatch<SetStateAction<DateStateRangeType>>;
};

interface DateTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  isModal?: boolean;
  setIsOpenedDatePicker?: (value: boolean | ((prev: boolean) => boolean)) => any;
  dateTextInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const DateTextInput: FC<DateTextInputProps & (DateStateProps | DateStateRangeProps)> = ({
  dateState,
  dateStateRange,
  setDateState,
  setDateStateRange,
  isModal = false,
  className,
  setIsOpenedDatePicker,
  dateTextInputRef: outerInputRef,
  ...props
}) => {
  const inputRef = outerInputRef || useRef<HTMLInputElement>(null);
  const { handleMouseUpAndDown, handleKey, handleBlur, handlePreventDefault } = setDateState
    ? useDateTextInputHandlers({
        dateState: dateState,
        inputRef: inputRef,
        setDateState: setDateState,
        isModal: isModal,
      })
    : useDateTextInputHandlers({
        dateStateRange: dateStateRange,
        inputRef: inputRef,
        setDateStateRange: setDateStateRange,
        isModal: isModal,
      });

  const handleClickIsOpenedDatePicker = () => {
    if (setIsOpenedDatePicker && props.disabled !== true && isModal) setIsOpenedDatePicker((state) => !state);
  };

  const textValue = dateState
    ? getStringDateFromDateState(dateState)
    : dateStateRange
      ? getStringDateFromDateStateRange(dateStateRange)
      : 'error';

  return (
    <TextInput
      ref={inputRef}
      value={textValue}
      onKeyDown={handleKey}
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
