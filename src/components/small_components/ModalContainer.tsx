import React, { useState, useEffect, ReactNode } from 'react';

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

const ModalContainer: React.FC<{
  children: ReactNode;
  isOpened: boolean;
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}> = ({ children, isOpened, setIsOpened, className, style, zIndex }) => {
  const isMounted = useMount(isOpened);

  if (!isMounted) return null;
  else
    return (
      <div
        onMouseDown={(event) => {
          event.stopPropagation();
          if (event.button === 0 && setIsOpened) setIsOpened(false);
        }}
        style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: zIndex }}
        className={`bg-body-backout d-flex justify-content-center align-items-center ${
          isOpened ? 'appear-backgrownd-animation-150' : 'close-backgrownd-animation-150'
        }`}
      >
        <div
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          style={style}
          className={`${isOpened ? 'appear-animation-150' : 'close-animation-150'} ${className && className}`}
        >
          {children}
        </div>
      </div>
    );
};

export default ModalContainer;
