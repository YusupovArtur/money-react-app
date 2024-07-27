import { CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react';
// Containers
import ModalContainer from 'shared/containers/ModalContainer';
// Hooks
import useClickOutside from 'shared/hooks/useClickOutside';
import useThrottledCallback from 'shared/hooks/useThrottledCallback';
// Helpers
import MenuAlignmentType from './types/MenuAlignmentType.ts';
import getMenuAlignmentStyle from './helpers/getMenuAlignmentStyle.ts';
import getPositionedMenuAlignment from './helpers/getPositionedMenuAlignment.ts';
import getDeviceType from './helpers/getDeviceType.ts';

interface BaseDropdownContainerProps {
  DropdownToggle: ReactNode;
  DropdownMenu: ReactNode;
  isInsideClickClose?: boolean;
  isOutsideClickClose?: boolean;
  menuAlignment?: MenuAlignmentType;
  modalForMobileDevice?: { isEnable: boolean; zIndex?: number };
}

interface WithStateDropdownContainerProps extends BaseDropdownContainerProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

interface WithoutStateDropdownContainerProps extends BaseDropdownContainerProps {
  isOpened?: never;
  setIsOpened?: never;
}

type DropdownContainerProps = WithStateDropdownContainerProps | WithoutStateDropdownContainerProps;

const DropdownContainer: FC<DropdownContainerProps> = ({
  DropdownToggle,
  DropdownMenu,
  isOpened: outerIsOpened,
  setIsOpened: outerSetIsOpened,
  isInsideClickClose = true,
  isOutsideClickClose = true,
  menuAlignment = { y: 'bottom', x: 'right' },
  modalForMobileDevice: { isEnable = false, zIndex = 3 } = {},
}) => {
  const [isOpened, setIsOpened] =
    outerIsOpened !== undefined && outerSetIsOpened ? [outerIsOpened, outerSetIsOpened] : useState<boolean>(false);

  const toggleRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLSpanElement>(null);

  const [menuAlignmentStyle, setMenuAlignmentStyle] = useState<CSSProperties>(getMenuAlignmentStyle(menuAlignment));
  const deviceType = isEnable ? getDeviceType() : 'desktop';

  const handleToggleClick = () => {
    setIsOpened((state) => !state);
  };

  const handleMenuClick = () => {
    if (isInsideClickClose) {
      setIsOpened(false);
    }
  };

  const handleOutsideClick = () => {
    if (isOutsideClickClose) {
      setIsOpened(false);
    }
  };

  const throttledHandleScroll = useThrottledCallback(() => {
    if (toggleRef && menuRef && toggleRef.current && menuRef.current) {
      const alignmentPositioned = getPositionedMenuAlignment({ toggleRef, menuRef, menuAlignment });
      const alignmentStyle = getMenuAlignmentStyle(alignmentPositioned);
      setMenuAlignmentStyle(alignmentStyle);
    }
  }, 100);

  useClickOutside({ elementRef: [toggleRef, menuRef], onClickOutside: handleOutsideClick });

  useLayoutEffect(() => {
    if (isOpened) {
      const alignment = getPositionedMenuAlignment({ toggleRef, menuRef, menuAlignment });
      const alignmentStyle = getMenuAlignmentStyle(alignment);
      setMenuAlignmentStyle(alignmentStyle);
    }
  }, [isOpened]);

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

      {isOpened && deviceType === 'desktop' && (
        <span
          onClick={handleMenuClick}
          ref={menuRef}
          style={{ position: 'absolute', display: 'inline-block', ...menuAlignmentStyle }}
        >
          {DropdownMenu}
        </span>
      )}

      {isOpened && deviceType === 'mobile' && (
        <ModalContainer
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          onClick={() => setIsOpened(false)}
          zIndex={zIndex}
          style={{ margin: 'auto' }}
        >
          {DropdownMenu}
        </ModalContainer>
      )}
    </div>
  );
};

export default DropdownContainer;
