import React, { FC, HTMLAttributes, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
// Model
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
// Components
import { DateTextInput } from './inputs/DateTextInput/DateTextInput.tsx';
// Helpers
import { deepEqual, getDeviceType } from 'shared/helpers';
import { getDateStateFromTimestamp, getDateStateRangeFromTimestampRange } from './helpers/getDateStateFromTimestamp.ts';
import { getTimestampFromDateState, getTimestampRangeFromDateStateRange } from './helpers/getTimestampFromDateState.ts';
// UI
import { DropdownContainer } from 'shared/containers';
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
import { CalendarIcon } from 'shared/inputs/DateInput/ui/CalendarIcon.tsx';
import { DateInputPicker } from 'shared/inputs/DateInput/inputs/DateInputPicker/DateInputPicker.tsx';
import { SetStateCallbackType } from 'shared/types/SetStateCallbackType.ts';
import { RangeType } from 'shared/types';

// (value: number | ((prev: number) => number)) => any
type DateStateProps = {
  timestamp: number;
  setTimestamp: SetStateCallbackType<number>;
  timestampRange?: never;
  setTimestampRange?: never;
};

type DateStateRangeProps = {
  timestamp?: never;
  setTimestamp?: never;
  timestampRange: RangeType<number>;
  setTimestampRange: SetStateCallbackType<RangeType<number>>;
};

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'style'> {
  disabled?: boolean;

  isModalDropdownContainerForMobileDevice?: boolean;
  portalContainerForDropdownContainer?: HTMLElement | null;
  dropdownContainerZIndex?: number;

  dateInputsDivContainersProps?: HTMLAttributes<HTMLDivElement>;
  dateTextInputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'style' | 'disabled'> & {
    style?: Omit<React.CSSProperties, 'fontSize'> & {
      fontSize?: `${number}rem`;
    };
  };
}

export const DateInput: FC<DateInputProps & (DateStateProps | DateStateRangeProps)> = ({
  timestamp,
  setTimestamp,
  timestampRange,
  setTimestampRange,

  disabled,

  isModalDropdownContainerForMobileDevice = false,
  portalContainerForDropdownContainer,
  dropdownContainerZIndex = 3,

  dateInputsDivContainersProps,
  dateTextInputProps,
}) => {
  const [dateState, setDateState] =
    timestamp !== undefined ? useState<DateStateType>(getDateStateFromTimestamp(timestamp)) : [undefined, undefined];

  const [dateStateRange, setDateStateRange] = timestampRange
    ? useState<DateStateRangeType>(getDateStateRangeFromTimestampRange(timestampRange))
    : [undefined, undefined];

  const dateTextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateState && setTimestamp) {
      if (!deepEqual(getTimestampFromDateState(dateState), timestamp)) {
        setTimestamp(getTimestampFromDateState(dateState));
      }
    }
  }, [dateState]);
  useEffect(() => {
    if (timestamp !== undefined && setDateState) {
      setDateState((state) => {
        const dateStateTimestamp = getTimestampFromDateState(state);
        if (!deepEqual(timestamp, dateStateTimestamp)) {
          return getDateStateFromTimestamp(timestamp);
        }
        return state;
      });
    }
  }, [timestamp]);

  useEffect(() => {
    if (dateStateRange && setTimestampRange) {
      if (!deepEqual(getTimestampRangeFromDateStateRange(dateStateRange), timestampRange)) {
        setTimestampRange(getTimestampRangeFromDateStateRange(dateStateRange));
      }
    }
  }, [dateStateRange]);

  useEffect(() => {
    if (timestampRange && setDateStateRange) {
      setDateStateRange((state) => {
        const dateStateRangeTimestampRange = getTimestampRangeFromDateStateRange(state);
        if (!deepEqual(timestampRange, dateStateRangeTimestampRange)) {
          return getDateStateRangeFromTimestampRange(timestampRange);
        }
        return state;
      });
    }
  }, [timestampRange]);

  // For text field
  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState<boolean>(false);

  const isMobile = !isModalDropdownContainerForMobileDevice ? false : getDeviceType() === 'mobile';

  const iconSize = dateTextInputProps?.style?.fontSize || '1.2rem';
  const { className: divClassName, ...restDivProps } = dateInputsDivContainersProps || {};

  return (
    <div className={`d-flex ${divClassName || ''}`} {...restDivProps}>
      <DropdownContainer
        isOpened={isOpenedDatePicker}
        setIsOpened={setIsOpenedDatePicker}
        disabled={disabled}
        isModalDropdownContainerForMobileDevice={isModalDropdownContainerForMobileDevice}
        portalContainer={portalContainerForDropdownContainer}
        isInsideClickClose={false}
        menuAlignment={{ x: 'right', y: 'top' }}
        zIndex={dropdownContainerZIndex}
        dropdownDivContainerProps={{ style: { width: undefined, height: undefined } }}
        additionalRefsForClickOutsideIgnore={[dateTextInputRef]}
        DropdownToggle={
          <ButtonWithIcon
            disabled={disabled}
            style={{ width: '100%', height: '100%' }}
            className={`align-self-stretch btn btn-primary rounded-end-0 ${isOpenedDatePicker ? 'active' : ''}`}
          >
            <CalendarIcon iconSize={iconSize} />
          </ButtonWithIcon>
        }
        DropdownMenu={
          <DropdownMenuWrapper>
            {dateState && setDateState && (
              <DateInputPicker
                dateState={dateState}
                setDateState={setDateState}
                setIsOpenedDatepicker={setIsOpenedDatePicker}
                isModal={isMobile}
              />
            )}
            {dateStateRange && setDateStateRange && (
              <DateInputPicker
                dateStateRange={dateStateRange}
                setDateStateRange={setDateStateRange}
                setIsOpenedDatepicker={setIsOpenedDatePicker}
                isModal={isMobile}
              />
            )}
          </DropdownMenuWrapper>
        }
      ></DropdownContainer>

      {dateState && setDateState && (
        <DateTextInput
          dateState={dateState}
          setDateState={setDateState}
          isModal={isMobile}
          disabled={disabled}
          setIsOpenedDatePicker={setIsOpenedDatePicker}
          dateTextInputRef={dateTextInputRef}
          {...dateTextInputProps}
        />
      )}

      {dateStateRange && setDateStateRange && (
        <DateTextInput
          dateStateRange={dateStateRange}
          setDateStateRange={setDateStateRange}
          isModal={isMobile}
          disabled={disabled}
          setIsOpenedDatePicker={setIsOpenedDatePicker}
          dateTextInputRef={dateTextInputRef}
          {...dateTextInputProps}
        />
      )}
    </div>
  );
};
