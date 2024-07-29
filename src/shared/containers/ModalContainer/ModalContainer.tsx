import { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';
import useMounted from './hooks/useMounted';
import './style/animations.scss';

const ANIMATION_TIMEOUT = 150;

interface ModalContainerProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  isOpened: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
}

const ModalContainer: FC<ModalContainerProps> = ({ children, isOpened, setIsOpened, zIndex = 2, className = '', ...props }) => {
  const isMounted = useMounted({ isOpened, animationTimeout: ANIMATION_TIMEOUT });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isMouseDown = useRef<boolean>(false);

  if (!isMounted) return null;

  return createPortal(
    <div
      onMouseDown={(event) => {
        isMouseDown.current = event.button === 0;
      }}
      onMouseUp={(event) => {
        if (isMouseDown.current && event.button === 0 && setIsOpened) {
          setIsOpened(false);
        }
        isMouseDown.current = false;
      }}
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: zIndex }}
      className={`bg-body-backout d-flex ${isOpened ? 'opacity-enter-150' : 'opacity-out-150'}`}
    >
      <span
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        onMouseUp={(event) => {
          event.stopPropagation();
        }}
        ref={modalContainerRef}
        className={`${className} ${isOpened ? 'scale-opacity-enter-150' : 'scale-opacity-out-150'}`}
        {...props}
      >
        {children}
      </span>
    </div>,
    document.body,
  );
};

export default ModalContainer;
