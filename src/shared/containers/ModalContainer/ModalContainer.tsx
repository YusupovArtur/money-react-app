import { FC, HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from './hooks/useMounted';
import './style/modal-animations.scss';

export const MODAL_CONTAINER_ANIMATION_DURATION = 150;

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpened: boolean;
  onCollapse?: (isOpened: boolean) => any;
  zIndex?: number;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isOpened,
  onCollapse,
  zIndex = 2,
  className = '',
  ...props
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const isMounted = useMounted({ isOpened, duration: MODAL_CONTAINER_ANIMATION_DURATION });
  const isMousePressedDown = useRef<boolean>(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onCollapse) {
        onCollapse(false);
      }
    };

    if (isOpened) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpened, onCollapse]);

  const handleBackoutMouseDown = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    isMousePressedDown.current = event.button === 0;
  };

  const handleBackoutMouseUp = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMousePressedDown.current && event.button === 0 && onCollapse) {
      onCollapse(false);
    }
    isMousePressedDown.current = false;
  };

  const handleMouseEventStopPropagation = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      onMouseDown={handleBackoutMouseDown}
      onMouseUp={handleBackoutMouseUp}
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: zIndex }}
      className={`bg-body-backout d-flex ${isOpened ? 'opacity-enter-150' : 'opacity-out-150'}`}
    >
      <div
        onMouseDown={handleMouseEventStopPropagation}
        onMouseUp={handleMouseEventStopPropagation}
        ref={modalContainerRef}
        className={`${className} ${isOpened ? 'scale-opacity-enter-150' : 'scale-opacity-out-150'}`}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
