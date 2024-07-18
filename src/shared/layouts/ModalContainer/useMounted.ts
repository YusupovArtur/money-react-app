import { useEffect, useRef, useState } from 'react';

const useMounted = (isOpened: boolean) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ANIMATION_TIME = 150;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      }, ANIMATION_TIME);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpened]);
  return isMounted;
};

export default useMounted;
