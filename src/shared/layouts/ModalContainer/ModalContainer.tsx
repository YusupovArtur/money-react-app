import { Dispatch, FC, ReactNode, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';
import useMounted from './useMounted.ts';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import './animations.scss';

const ModalContainer: FC<{
  children: ReactNode;
  isOpened: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  zIndex?: number;
}> = ({ children, isOpened, setIsOpened, onClose, zIndex }) => {
  const isMounted = useMounted(isOpened);

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
      className={`bg-body-backout d-flex justify-content-center align-items-center ${
        isOpened ? 'opacity-enter-150' : 'opacity-out-150'
      }`}
    >
      <div ref={modalContainerRef} className={`${isOpened ? 'scale-opacity-enter-150' : 'scale-opacity-out-150'}`}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ModalContainer;
