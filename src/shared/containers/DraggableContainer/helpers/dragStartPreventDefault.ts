import { DragEvent } from 'react';

export const dragStartPreventDefault = (event: DragEvent<HTMLDivElement>) => {
  const img = new Image();
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  event.dataTransfer.setDragImage(img, 0, 0);
  event.dataTransfer.clearData();
};
