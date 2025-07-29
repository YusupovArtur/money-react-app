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
import { SetStateCallbackType } from 'shared/types';
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
  timestampRange: RangeType;
  setTimestampRange: SetStateCallbackType<RangeType>;
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

  const setDateStateWithCallback: SetStateCallbackType<DateStateType> = (updater) => {
    if (setDateState && setTimestamp) {
      if (typeof updater === 'function') {
        setDateState((state) => {
          const newState = updater(state);
          if (state !== newState) {
            setTimestamp(getTimestampFromDateState(newState));
          }
          return newState;
        });
      } else {
        setDateState(updater);
        setTimestamp(getTimestampFromDateState(updater));
      }
    }
  };
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

  const setDateStateRangeWithCallback: SetStateCallbackType<DateStateRangeType> = (updater) => {
    if (setDateStateRange && setTimestampRange) {
      if (typeof updater === 'function') {
        setDateStateRange((state) => {
          const newState = updater(state);
          if (state !== newState) {
            setTimestampRange(getTimestampRangeFromDateStateRange(newState));
          }
          return newState;
        });
      } else {
        setDateStateRange(updater);
        setTimestampRange(getTimestampRangeFromDateStateRange(updater));
      }
    }
  };
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
        menuAlignment={{ x: 'right', y: 'bottom' }}
        zIndex={dropdownContainerZIndex}
        toggleDivStyleProps={{ style: { width: undefined, height: undefined } }}
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
            {dateState && (
              <DateInputPicker
                dateState={dateState}
                setDateState={setDateStateWithCallback}
                setIsOpenedDatepicker={setIsOpenedDatePicker}
                isModal={isMobile}
              />
            )}
            {dateStateRange && (
              <DateInputPicker
                dateStateRange={dateStateRange}
                setDateStateRange={setDateStateRangeWithCallback}
                setIsOpenedDatepicker={setIsOpenedDatePicker}
                isModal={isMobile}
              />
            )}
          </DropdownMenuWrapper>
        }
      ></DropdownContainer>

      {dateState && (
        <DateTextInput
          dateState={dateState}
          setDateState={setDateStateWithCallback}
          isModal={isMobile}
          disabled={disabled}
          setIsOpenedDatePicker={setIsOpenedDatePicker}
          dateTextInputRef={dateTextInputRef}
          {...dateTextInputProps}
        />
      )}

      {dateStateRange && (
        <DateTextInput
          dateStateRange={dateStateRange}
          setDateStateRange={setDateStateRangeWithCallback}
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
