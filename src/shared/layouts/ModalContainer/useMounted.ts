import { useEffect, useState } from 'react';
// import { ANIMATION_TIME } from './config.tsx';

const useMounted = (isOpened: boolean) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ANIMATION_TIME = 150;
  useEffect(() => {
    if (isOpened && !isMounted) {
      setIsMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_TIME);
    }
  }, [isOpened]);
  return isMounted;
};

export default useMounted;
