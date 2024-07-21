import { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';
import useMounted from './hooks/useMounted.ts';
import useClickOutside from 'shared/hooks/useClickOutside';
import './ui/animations.scss';

const ANIMATION_TIMEOUT = 150;

interface ModalContainerProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  isOpened: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  zIndex?: number;
}

const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isOpened,
  setIsOpened,
  onClose,
  zIndex = 2,
  className = '',
  ...props
}) => {
  const isMounted = useMounted({ isOpened, animationTimeout: ANIMATION_TIMEOUT });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    elementRef: modalContainerRef,
    onClickOutside: () => {
      if (setIsOpened) setIsOpened(false);
      if (onClose) onClose();
    },
  });

  if (!isMounted) return null;

  return createPortal(
    <div
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: zIndex }}
      className={`bg-body-backout d-flex ${isOpened ? 'opacity-enter-150' : 'opacity-out-150'}`}
    >
      <span
        style={{ transform: 'top' }}
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
