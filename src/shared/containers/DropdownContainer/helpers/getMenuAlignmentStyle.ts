import { CSSProperties, RefObject } from 'react';
import { MenuAlignmentType } from '../types/MenuAlignmentType';

type GetMenuAlignmentStyleType = (props: {
  menuAlignment: MenuAlignmentType;
  toggleRef: RefObject<HTMLSpanElement | null>;
  menuRef: RefObject<HTMLSpanElement | null>;
}) => CSSProperties;

export const getMenuAlignmentStyle: GetMenuAlignmentStyleType = (props) => {
  const { x, y } = props.menuAlignment;
  const { toggleRef, menuRef } = props;
  const style: CSSProperties = {};

  if (toggleRef.current && menuRef.current) {
    const toggleRect = toggleRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    if (y === 'bottom') {
      style.top = toggleRect.bottom;
    } else {
      style.top = toggleRect.top - menuRect.height;
    }

    if (x === 'left') {
      style.left = toggleRect.right - menuRect.width;
    } else {
      style.left = toggleRect.left;
    }
  }

  return style;
};
