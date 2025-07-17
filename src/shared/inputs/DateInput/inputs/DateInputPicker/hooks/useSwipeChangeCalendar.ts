import { TouchEvent, useRef } from 'react';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';

export const useSwipeChangeCalendar = (enabled: boolean) => {
  const { state, dispatch } = useDatePickerContext();
  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (enabled && state.calendarLevel !== 'year' && event.touches.length === 1) {
      x.current = event.touches[0].clientX;
      y.current = event.touches[0].clientY;
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (
      enabled &&
      state.calendarLevel !== 'year' &&
      event.changedTouches.length === 1 &&
      x.current !== null &&
      y.current !== null
    ) {
      const dx = event.changedTouches[0].clientX - x.current;
      const dy = event.changedTouches[0].clientY - y.current;

      if (Math.abs(dx) > 1.5 * Math.abs(dy) && Math.abs(dx) > 70) {
        dispatch({ type: dx > 0 ? 'incrementCalendarState' : 'decrementCalendarState' });
      }
    }

    x.current = null;
    y.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
};
