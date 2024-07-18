import { useEffect, useState } from 'react';
import { ANIMATION_TIME } from './config.tsx';

const useDebouncedValue = <T>(value: T): T => {
  const [isMounted, setIsMounted] = useState<T>(value);
  useEffect(() => {
    if (value && !isMounted) {
      setIsMounted(true);
    } else if (!value && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_TIME);
    }
  }, [value]);
  return isMounted;
};

export default useDebouncedValue;
