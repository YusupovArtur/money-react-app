import { FC, MouseEvent as ReactMouseEvent, MutableRefObject, TouchEvent as ReactTouchEvent, useRef, WheelEvent } from 'react';
// Helpers
import { useTouchEventListeners } from './hooks/useTouchEventListeners.ts';
import { CoordsType } from './types/CoordsType.ts';
import { drawCanvasImage } from '../helpers/drawCanvasImage.ts';
import { moveCanvasImageCoordinates } from './helpers/moveCanvasImageCoordiates.ts';
import { onTouchStart } from 'pages/ProfilePage/features/UserPhotoChangeForm/ImageCanvas/handlers/onTouchStart.ts';
import { onTouchMove } from 'pages/ProfilePage/features/UserPhotoChangeForm/ImageCanvas/handlers/onTouchMove.ts';
import { clamp } from 'shared/helpers';

interface ImageCanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  image: MutableRefObject<HTMLImageElement>;
  canvasSize?: string;
}

export const ImageCanvas: FC<ImageCanvasProps> = ({ canvasRef, image, canvasSize = '30rem' }) => {
  const imageX = useRef<number>(0);
  const imageY = useRef<number>(0);
  const scale = useRef<number>(1);
  const isMousePressed = useRef<boolean>(false);

  const touch = useRef<CoordsType | null>(null);
  const touch1 = useRef<CoordsType | null>(null);
  const touch2 = useRef<CoordsType | null>(null);

  const drawImage = () => {
    requestAnimationFrame(() => {
      drawCanvasImage({
        canvas: canvasRef.current,
        image: image.current,
        x: imageX.current,
        y: imageY.current,
        scale: scale.current,
      });
    });
  };

  const moveCoords = (props: { dx: number; dy: number; dScale: number }) => {
    scale.current = clamp(scale.current + props.dScale, 0.2, 1);
    moveCanvasImageCoordinates({
      canvas: canvasRef.current,
      image: image.current,
      xRef: imageX,
      yRef: imageY,
      scaleRef: scale,
      dx: props.dx,
      dy: props.dy,
    });
  };

  const handleWheel = (event: WheelEvent<HTMLCanvasElement>) => {
    const dScale = (scale.current * 0.075 * event.deltaY) / Math.abs(event.deltaY);
    moveCoords({ dx: 0, dy: 0, dScale });
    drawImage();
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLCanvasElement, globalThis.MouseEvent> | MouseEvent) => {
    if (isMousePressed.current) {
      moveCoords({ dx: event.movementX, dy: event.movementY, dScale: 0 });
      drawImage();
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => {
    onTouchStart({ event, touch, touch1, touch2 });
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent) => {
    onTouchMove({ event, drawImage, moveCoords, scale, touch, touch1, touch2 });
  };

  const handleMouseDown = () => {
    isMousePressed.current = true;
  };

  const handleMouseUp = () => {
    isMousePressed.current = false;
  };

  const handleTouchEnd = () => {
    touch.current = null;
    touch1.current = null;
    touch2.current = null;
  };

  useTouchEventListeners({ canvasRef, handleTouchStart, handleTouchMove });

  return (
    <>
      <canvas
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        style={{ maxWidth: canvasSize, width: '90vmin', maxHeight: canvasSize, height: '90vmin', cursor: 'move' }}
        className="align-self-center rounded-circle"
      ></canvas>
    </>
  );
};
