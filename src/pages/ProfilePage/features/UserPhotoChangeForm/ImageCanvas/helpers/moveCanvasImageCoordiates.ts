import { RefObject } from 'react';
import { clamp } from 'shared/helpers';

export const moveCanvasImageCoordinates = (props: {
  canvas: HTMLCanvasElement | null;
  image: HTMLImageElement;
  xRef: RefObject<number>;
  yRef: RefObject<number>;
  scaleRef: RefObject<number>;
  dx: number;
  dy: number;
}) => {
  const { canvas, image, xRef, yRef, scaleRef, dx, dy } = props;

  const imageSize: number = Math.min(image.width, image.height) * scaleRef.current;
  const moveScale = canvas ? (Math.min(image.width, image.height) / Math.min(canvas.width, canvas.height)) * scaleRef.current : 1;

  const dx_rescale = -dx * moveScale;
  const dy_rescale = -dy * moveScale;

  const x_max = (image.width - imageSize) / 2;
  const y_max = (image.height - imageSize) / 2;
  const x_min = (imageSize - image.width) / 2;
  const y_min = (imageSize - image.height) / 2;

  xRef.current = clamp(xRef.current + dx_rescale, x_min, x_max);
  yRef.current = clamp(yRef.current + dy_rescale, y_min, y_max);
};
