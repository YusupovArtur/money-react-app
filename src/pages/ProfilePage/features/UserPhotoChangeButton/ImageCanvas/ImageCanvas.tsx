import { FC, MouseEvent, MutableRefObject, useRef, WheelEvent } from 'react';
// Helpers
import { drawCanvasImage } from 'pages/ProfilePage/features/UserPhotoChangeButton/helpers/drawCanvasImage.ts';
import { moveCanvasImageCoordinates } from './helpers/moveCanvasImageCoordiates.ts';

interface ImageCanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  image: MutableRefObject<HTMLImageElement>;
  canvasSize?: string;
}

export const ImageCanvas: FC<ImageCanvasProps> = ({ canvasRef, image, canvasSize = '30rem' }) => {
  const image_dx = useRef<number>(0);
  const image_dy = useRef<number>(0);
  const scale = useRef<number>(1);
  const isMousePressed = useRef<boolean>(false);

  const requestAnimationFrameDrawImage = () => {
    requestAnimationFrame(() =>
      drawCanvasImage(canvasRef.current, image.current, image_dx.current, image_dy.current, scale.current),
    );
  };

  const handleWheel = (event: WheelEvent<HTMLCanvasElement>) => {
    const d_scale_rescale = (scale.current * 0.1 * event.deltaY) / Math.abs(event.deltaY);
    scale.current = Math.min(Math.max(scale.current + d_scale_rescale, 0.2), 1);

    moveCanvasImageCoordinates(canvasRef.current, image.current, image_dx, image_dy, scale, event.movementX, event.movementY);
    requestAnimationFrameDrawImage();
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
    if (isMousePressed.current) {
      moveCanvasImageCoordinates(canvasRef.current, image.current, image_dx, image_dy, scale, event.movementX, event.movementY);
      requestAnimationFrameDrawImage();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseDown={() => {
        isMousePressed.current = true;
      }}
      onMouseUp={() => {
        isMousePressed.current = false;
      }}
      onMouseLeave={() => {
        isMousePressed.current = false;
      }}
      style={{ maxWidth: canvasSize, width: '90vmin', maxHeight: canvasSize, height: '90vmin', cursor: 'move' }}
      className="align-self-center rounded-circle"
    ></canvas>
  );
};
