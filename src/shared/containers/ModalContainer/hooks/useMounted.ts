import { useEffect, useRef, useState } from 'react';

const useMounted = (props: { isOpened: boolean; duration: number }) => {
  const { isOpened, duration } = props;
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
      }, duration);
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
