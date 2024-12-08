import { useEffect, useState } from 'react';
import { useTimeoutRefWithClear } from 'shared/hooks';

export const useMounted = (props: { isOpened: boolean; duration: number }) => {
  const { isOpened, duration } = props;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const timeoutRef = useTimeoutRefWithClear();

  useEffect(() => {
    if (isOpened && !isMounted) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        timeoutRef.current = null;
        setIsMounted(false);
      }, duration);
    }
  }, [isOpened]);
  return isMounted;
};
