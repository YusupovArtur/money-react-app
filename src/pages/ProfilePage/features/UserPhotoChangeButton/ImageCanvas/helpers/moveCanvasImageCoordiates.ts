import { MutableRefObject } from 'react';

export const moveCanvasImageCoordinates = (
  canvas: HTMLCanvasElement | null,
  image: HTMLImageElement,
  x: MutableRefObject<number>,
  y: MutableRefObject<number>,
  scale: MutableRefObject<number>,
  dx: number,
  dy: number,
) => {
  const imageSize: number = Math.min(image.width, image.height) * scale.current;
  const move_scale = canvas ? (Math.min(image.width, image.height) / Math.min(canvas.width, canvas.height)) * scale.current : 1;

  const dx_rescale = -dx * move_scale;
  const dy_rescale = -dy * move_scale;

  const x_max = (image.width - imageSize) / 2;
  const y_max = (image.height - imageSize) / 2;
  const x_min = (imageSize - image.width) / 2;
  const y_min = (imageSize - image.height) / 2;

  x.current = Math.min(Math.max(x.current + dx_rescale, x_min), x_max);
  y.current = Math.min(Math.max(y.current + dy_rescale, y_min), y_max);
};
