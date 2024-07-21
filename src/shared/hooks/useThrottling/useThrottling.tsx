import { useCallback, useEffect, useRef } from 'react';

const useThrottling = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledFunction as T;
};

export default useThrottling;
