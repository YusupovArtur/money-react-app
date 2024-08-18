import { CSSProperties } from 'react';
import { MenuAlignmentType } from '../types/MenuAlignmentType';

export const getMenuAlignmentStyle = (props: MenuAlignmentType): CSSProperties => {
  const { x, y } = props;

  const style: CSSProperties = {};

  if (y === 'bottom') {
    style.top = '100%';
  } else {
    style.bottom = '100%';
  }

  if (x === 'left') {
    style.right = '0%';
  } else {
    style.left = '0%';
  }

  return style;
};
