import { MutableRefObject } from 'react';
import { MenuAlignmentType } from '../types/MenuAlignmentType';

type GetPositionedMenuAlignmentType = (props: {
  menuAlignment: MenuAlignmentType;
  toggleRef: MutableRefObject<HTMLSpanElement | null>;
  menuRef: MutableRefObject<HTMLSpanElement | null>;
}) => {
  alignment: MenuAlignmentType;
  maxHeight?: number;
};

export const getPositionedMenuAlignment: GetPositionedMenuAlignmentType = (props) => {
  const { toggleRef, menuRef, menuAlignment } = props;

  if (toggleRef.current && menuRef.current && window.visualViewport) {
    const alignment: MenuAlignmentType = { ...menuAlignment };

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const view = window.visualViewport;

    const leftSpace = toggleRect.left + toggleRect.width - view.pageLeft;
    const rightSpace = view.width + view.pageLeft - toggleRect.left;
    const topSpace = toggleRect.top - view.pageTop;
    const bottomSpace = view.height + view.pageTop - toggleRect.bottom;

    const maxHeight: number | undefined = Math.max(bottomSpace, topSpace) - 10;

    if (
      (menuAlignment.y === 'bottom' && bottomSpace < menuRect.height && topSpace > menuRect.height) ||
      (bottomSpace < menuRect.height && topSpace < menuRect.height && topSpace > bottomSpace)
    ) {
      alignment.y = 'top';
    } else if (
      (menuAlignment.y === 'top' && topSpace < menuRect.height && bottomSpace > menuRect.height) ||
      (topSpace < menuRect.height && bottomSpace < menuRect.height && bottomSpace > topSpace)
    ) {
      alignment.y = 'bottom';
    }

    if (
      (menuAlignment.x === 'left' && leftSpace < menuRect.width && rightSpace > menuRect.width) ||
      (rightSpace < menuRect.width && leftSpace < menuRect.width && rightSpace > leftSpace)
    ) {
      alignment.x = 'right';
    } else if (
      (menuAlignment.x === 'right' && rightSpace < menuRect.width && leftSpace > menuRect.width) ||
      (leftSpace < menuRect.width && rightSpace < menuRect.width && leftSpace > rightSpace)
    ) {
      alignment.x = 'left';
    }

    return { alignment, maxHeight };
  }

  return { alignment: menuAlignment };
};
