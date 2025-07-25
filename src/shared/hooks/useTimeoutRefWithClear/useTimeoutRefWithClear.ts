import { RefObject, useEffect, useRef } from 'react';

export const useTimeoutRefWithClear = (extraDeps: ReadonlyArray<any> = []): RefObject<NodeJS.Timeout | null> => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [...extraDeps]);

  return timeoutRef;
};
