import { useEffect, useState } from 'react';

interface useDragEnterProps {
  id: string;
  dragStartID: string;
  dragOverID: string;
  itemIDAbove: string;
  openClassName: string;
  closeClassName: string;
}

const useDragEnter = (props: useDragEnterProps) => {
  const ANIMATION_TIME = 60;
  const { dragStartID, dragOverID, id, itemIDAbove, openClassName, closeClassName } = props;

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
    if (dragStartID && dragOverID === id && dragStartID !== id && dragStartID !== itemIDAbove) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [dragStartID, dragOverID]);

  return dragClassName;
};

export default useDragEnter;
