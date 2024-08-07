import { RefObject, useEffect, useRef } from 'react';

type itemOrNonEmptyArray<T> = T | [T, T, ...T[]];

interface useClickOutsideProps {
  elementRef: itemOrNonEmptyArray<RefObject<HTMLElement>>;
  onClickOutside: () => void;
}

const useClickOutside = ({ elementRef, onClickOutside }: useClickOutsideProps) => {
  const mouseDownRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        mouseDownRef.current = event.target;
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      const elementsArray = Array.isArray(elementRef) ? elementRef : [elementRef];
      const isClickOutside =
        event.button === 0 &&
        mouseDownRef.current === event.target &&
        elementsArray.every((ref) => {
          return ref.current && !ref.current.contains(event.target as Node);
        });

      if (isClickOutside) {
        setTimeout(() => {
          onClickOutside();
        }, 0);
      }
    };

    document.addEventListener('pointerdown', handleMouseDown);
    document.addEventListener('pointerup', handleMouseUp);
    return () => {
      document.removeEventListener('pointerdown', handleMouseDown);
      document.removeEventListener('pointerup', handleMouseUp);
    };
  }, [
    ...(Array.isArray(elementRef) ? elementRef : [elementRef]),
    ...(Array.isArray(elementRef) ? elementRef.map((ref) => ref.current) : [elementRef.current]),
    onClickOutside,
  ]);
};

export default useClickOutside;
