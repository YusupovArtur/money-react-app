import { useEffect, RefObject } from 'react';

type itemOrNonEmptyArray<T> = T | [T, T, ...T[]];

interface useClickOutsideProps {
  elementRef: itemOrNonEmptyArray<RefObject<HTMLElement | null>>;
  onClickOutside: () => void;
}

// TODO: test this hook
const useClickOutside = ({ elementRef, onClickOutside }: useClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!Array.isArray(elementRef)) {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
          onClickOutside();
        }
      } else {
        if (elementRef.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
          onClickOutside();
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [elementRef, onClickOutside]);
};

export default useClickOutside;
