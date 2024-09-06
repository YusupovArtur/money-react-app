import { useCallback, useRef } from 'react';
import { useTimeoutRefWithClear } from 'shared/hooks';

export const useThrottledCallback = <T extends (...args: any[]) => any>(callback: T, delay: number): T => {
  const timeoutRef = useTimeoutRefWithClear();
  const lastCallRef = useRef<number>(0);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (lastCallRef.current === 0 || now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      } else if (timeoutRef.current === null) {
        const remainingTime = delay - (now - lastCallRef.current);
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
          timeoutRef.current = null;
        }, remainingTime);
      }
    },
    [callback, delay, timeoutRef.current, lastCallRef.current],
  );

  return throttledFunction as T;
};
