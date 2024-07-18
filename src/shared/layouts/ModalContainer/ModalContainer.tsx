import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const useMount = (isOpened: boolean) => {
  const [isMounted, setIsMounted] = useState(false);
  const ANIMATION_TIME = 150;
  useEffect(() => {
    if (isOpened && !isMounted) {
      setIsMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_TIME);
    }
  }, [isOpened]);
  return isMounted;
};

const ModalContainer: FC<{
  children: ReactNode;
  isOpened: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  zIndex?: number;
}> = ({ children, isOpened, setIsOpened, onClose, zIndex }) => {
  const isMounted = useMount(isOpened);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const backgroundClickHandler = (event: MouseEvent) => {
    if (modalContainerRef.current && !modalContainerRef.current.contains(event.target as Node)) {
      if (setIsOpened) setIsOpened(false);
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', backgroundClickHandler);
    return () => document.removeEventListener('mousedown', backgroundClickHandler);
  }, []);

  if (!isMounted) return null;
  else
    return ReactDOM.createPortal(
      <div
        style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: zIndex }}
        className={`bg-body-backout d-flex justify-content-center align-items-center ${
          isOpened ? 'appear-background-animation-150' : 'close-background-animation-150'
        }`}
      >
        <div ref={modalContainerRef} className={`${isOpened ? 'appear-animation-150' : 'close-animation-150'}`}>
          {children}
        </div>
      </div>,
      document.body,
    );
};

export default ModalContainer;
