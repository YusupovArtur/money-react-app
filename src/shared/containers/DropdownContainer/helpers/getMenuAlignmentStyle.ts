import { CSSProperties } from 'react';
import MenuAlignmentType from '../types/MenuAlignmentType';

const getMenuAlignmentStyle = (props: MenuAlignmentType): CSSProperties => {
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
  // if (alignmentY === 'bottom') {
  //   if (alignmentX === 'left') {
  //     return { top: '100%', left: '0%', position: 'absolute', display: 'inline-block' };
  //   } else {
  //     return { top: '100%', right: '0%', position: 'absolute', display: 'inline-block' };
  //   }
  // } else {
  //   if (alignmentX === 'left') {
  //     return { bottom: '100%', left: '0%', position: 'absolute', display: 'inline-block' };
  //   } else {
  //     return { bottom: '100%', right: '0%', position: 'absolute', display: 'inline-block' };
  //   }
  // }
};

export default getMenuAlignmentStyle;
