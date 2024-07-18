import { useState, useEffect } from 'react';

interface useDragEnterProps {
  dragStartID: string;
  dragOverID: string;
  itemID: string;
  itemIDAbove: string;
  openClassName: string;
  closeClassName: string;
}

const useDragEnter = (props: useDragEnterProps) => {
  const ANIMATION_TIME = 60;
  const { dragStartID, dragOverID, itemID, itemIDAbove, openClassName, closeClassName } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dragClassName, setDragClassName] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setDragClassName(openClassName);
    } else {
      setDragClassName((state) => {
        if (state === openClassName) setTimeout(() => setDragClassName(''), ANIMATION_TIME);
        return state === openClassName ? closeClassName : '';
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (dragStartID && dragOverID === itemID && dragStartID !== itemID && dragStartID !== itemIDAbove) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [dragStartID, dragOverID]);

  return dragClassName;
};

export default useDragEnter;
