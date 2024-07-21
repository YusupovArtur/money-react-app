import { CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// Hooks
import useClickOutside from 'shared/hooks/useClickOutside';
import useThrottling from 'shared/hooks/useThrottling';
// Helpers
import getMenuAlignmentStyle from './helpers/getMenuAlignmentStyle.ts';
import menuAlignmentType from './types/menuAlignmentType.ts';
import getMenuAlignment from 'shared/containers/DropdownContainer/helpers/getMenuAlignment.ts';

const DropdownContainer: FC<{
  DropdownToggle: ReactNode;
  DropdownMenu: ReactNode;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  isInsideClickClose?: boolean;
  isOutsideClickClose?: boolean;
  menuAlignment: menuAlignmentType;
}> = ({
  DropdownToggle,
  DropdownMenu,
  isOpened,
  setIsOpened,
  onOpen,
  onClose,
  isInsideClickClose = true,
  isOutsideClickClose = true,
  menuAlignment,
}) => {
  const toggleRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLSpanElement>(null);
  const [menuAlignmentStyle, setMenuAlignmentStyle] = useState<CSSProperties>(getMenuAlignmentStyle(menuAlignment));

  const handleToggleClick = () => {
    setIsOpened((state) => {
      if (!state && onOpen) onOpen();
      if (state && onClose) onClose();
      return !state;
    });
  };

  const handleMenuClick = () => {
    if (isInsideClickClose) {
      if (onClose) onClose();
      setIsOpened(false);
    }
  };

  const handleOutsideClick = () => {
    if (isOutsideClickClose) {
      if (onClose) onClose();
      setIsOpened(false);
    }
  };

  const throttledHandleScroll = useThrottling(() => {
    if (toggleRef && menuRef && toggleRef.current && menuRef.current) {
      const alignment = getMenuAlignment({ toggleRef, menuRef, menuAlignment });
      setMenuAlignmentStyle(getMenuAlignmentStyle(alignment));
    }
  }, 100);

  useClickOutside({ elementRef: [toggleRef, menuRef], onClickOutside: handleOutsideClick });

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    window.addEventListener('resize', throttledHandleScroll);
    window.addEventListener('wheel', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', throttledHandleScroll);
      window.removeEventListener('wheel', throttledHandleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span ref={toggleRef} onClick={handleToggleClick} style={{ display: 'inline-block' }}>
        {DropdownToggle}
      </span>
      {isOpened && (
        <span
          onClick={handleMenuClick}
          ref={menuRef}
          style={{ position: 'absolute', display: 'inline-block', ...menuAlignmentStyle }}
        >
          {DropdownMenu}
        </span>
      )}
    </div>
  );
};

export default DropdownContainer;
