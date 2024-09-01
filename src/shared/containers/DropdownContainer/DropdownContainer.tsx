import { CSSProperties, FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
// Containers
import { ModalContainer } from 'shared/containers';
// Hooks
import { useClickOutside, useThrottledCallback } from 'shared/hooks';
// Helpers
import { MenuAlignmentType } from './types/MenuAlignmentType';
import { getMenuAlignmentStyle } from './helpers/getMenuAlignmentStyle';
import { getPositionedMenuAlignment } from './helpers/getPositionedMenuAlignment';
import { getDeviceType } from 'shared/helpers';

interface BaseDropdownContainerProps {
  DropdownToggle: ReactNode;
  DropdownMenu: ReactNode;

  isInsideClickClose?: boolean;
  isOutsideClickClose?: boolean;

  menuAlignment?: MenuAlignmentType;
  zIndex?: number;
  isModalForMobileDevice?: boolean;
}

interface WithStateDropdownContainerProps extends BaseDropdownContainerProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => any;
}

interface WithoutStateDropdownContainerProps extends BaseDropdownContainerProps {
  isOpened?: never;
  setIsOpened?: never;
}

type DropdownContainerProps = WithStateDropdownContainerProps | WithoutStateDropdownContainerProps;

export const DropdownContainer: FC<DropdownContainerProps> = ({
  DropdownToggle,
  DropdownMenu,

  isOpened: outerIsOpened,
  setIsOpened: outerSetIsOpened,

  isInsideClickClose = true,
  isOutsideClickClose = true,

  menuAlignment = { y: 'bottom', x: 'right' },
  zIndex = 3,
  isModalForMobileDevice = false,
}) => {
  const [isOpened, setIsOpened] =
    outerIsOpened !== undefined && outerSetIsOpened ? [outerIsOpened, outerSetIsOpened] : useState<boolean>(false);

  const toggleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuAlignmentStyle, setMenuAlignmentStyle] = useState<CSSProperties>(getMenuAlignmentStyle(menuAlignment));
  const deviceType = isModalForMobileDevice ? getDeviceType() : 'desktop';

  const handleToggleClick = () => {
    setIsOpened(!isOpened);
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
      const { alignment, maxHeight } = getPositionedMenuAlignment({ toggleRef, menuRef, menuAlignment });
      const alignmentStyle = getMenuAlignmentStyle(alignment);
      setMenuAlignmentStyle({ ...alignmentStyle, maxHeight });
    }
  }, 100);

  useClickOutside({ elementRef: [toggleRef, menuRef], onClickOutside: handleOutsideClick });

  useLayoutEffect(() => {
    if (isOpened) {
      const { alignment, maxHeight } = getPositionedMenuAlignment({ toggleRef, menuRef, menuAlignment });
      const alignmentStyle = getMenuAlignmentStyle(alignment);
      setMenuAlignmentStyle({ ...alignmentStyle, maxHeight });
    }
  }, [isOpened, DropdownMenu]);

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
    <div style={{ position: 'relative' }}>
      <div ref={toggleRef} onClick={handleToggleClick} style={{ width: '100%', height: '100%' }}>
        {DropdownToggle}
      </div>

      {isOpened && deviceType === 'desktop' && (
        <div
          ref={menuRef}
          onClick={handleMenuClick}
          style={{ position: 'absolute', zIndex, overflowY: 'auto', ...menuAlignmentStyle }}
        >
          {DropdownMenu}
        </div>
      )}

      {isOpened && deviceType === 'mobile' && (
        <ModalContainer
          isOpened={isOpened}
          onCollapse={isOutsideClickClose ? setIsOpened : undefined}
          onClick={handleMenuClick}
          zIndex={zIndex}
          style={{ margin: 'auto' }}
        >
          {DropdownMenu}
        </ModalContainer>
      )}
    </div>
  );
};
