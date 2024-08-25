import { TouchEvent as ReactTouchEvent, useEffect } from 'react';

export const useTouchEventListeners = (props: {
  canvas: HTMLCanvasElement | null;
  handleTouchStart: (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => void;
  handleTouchMove: (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => void;
}) => {
  const { canvas, handleTouchStart, handleTouchMove } = props;

  useEffect(() => {
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);
};
