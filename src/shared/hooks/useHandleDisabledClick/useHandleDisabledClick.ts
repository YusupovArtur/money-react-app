import { useEffect, useState } from 'react';
import { useTimeoutRefWithClear } from 'shared/hooks';

export const useHandleDisabledClick = (props: { disabled: boolean | undefined; callback: () => any }) => {
  const { disabled, callback } = props;

  const timeoutRef = useTimeoutRefWithClear();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked) {
      timeoutRef.current = setTimeout(() => {
        setIsClicked(false);
      }, 100);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isClicked && disabled === false) {
      callback();
    }
    setIsClicked(false);
  }, [disabled]);

  return () => {
    setIsClicked(true);
  };
};
