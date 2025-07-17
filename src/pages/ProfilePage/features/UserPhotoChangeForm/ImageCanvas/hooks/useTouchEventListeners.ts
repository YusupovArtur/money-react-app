import { RefObject, TouchEvent as ReactTouchEvent, useEffect } from 'react';

export const useTouchEventListeners = (props: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  handleTouchStart: (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => void;
  handleTouchMove: (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => void;
}) => {
  const { canvasRef, handleTouchStart, handleTouchMove } = props;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvasRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('touchstart', handleTouchStart);
        canvasRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);
};
