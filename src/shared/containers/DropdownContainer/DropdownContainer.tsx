import { CSSProperties, FC, ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
// Containers
import { ModalContainer } from 'shared/containers';
// Hooks
import { useClickOutside, useThrottledCallback } from 'shared/hooks';
// Helpers
import { MenuAlignmentType } from './types/MenuAlignmentType';
import { getMenuAlignmentStyle } from './helpers/getMenuAlignmentStyle';
import { getPositionedMenuAlignment } from './helpers/getPositionedMenuAlignmentType.ts';
import { getDeviceType } from 'shared/helpers';
import { createPortal } from 'react-dom';

interface BaseDropdownContainerProps {
  DropdownToggle: ReactNode;
  DropdownMenu: ReactNode;

  disabled?: boolean;
  isInsideClickClose?: boolean;
  isOutsideClickClose?: boolean;

  menuAlignment?: MenuAlignmentType;
  zIndex?: number;
  dropdownDivContainerProps?: { style?: CSSProperties; className?: string };
  isModalDropdownContainerForMobileDevice?: boolean;
  portalContainer?: HTMLElement | null;

  toggleRef?: RefObject<HTMLDivElement | null>;
  menuRef?: RefObject<HTMLDivElement | null>;
  additionalRefsForClickOutsideIgnore?: RefObject<HTMLElement | null>[];
}

interface WithStateDropdownContainerProps extends BaseDropdownContainerProps {
  isOpened: boolean;
  setIsOpened: (value: boolean | ((prev: boolean) => boolean)) => any;
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
  disabled,

  isInsideClickClose = true,
  isOutsideClickClose = true,

  menuAlignment = { y: 'bottom', x: 'right' },
  zIndex = 3,
  dropdownDivContainerProps,
  isModalDropdownContainerForMobileDevice = false,
  portalContainer,
  toggleRef: innerToggleRef,
  menuRef: innerMenuRef,
  additionalRefsForClickOutsideIgnore,
}) => {
  const [isOpened, setIsOpened] =
    outerIsOpened !== undefined && outerSetIsOpened ? [outerIsOpened, outerSetIsOpened] : useState<boolean>(false);

  const toggleRef = innerToggleRef || useRef<HTMLDivElement>(null);
  const menuRef = innerMenuRef || useRef<HTMLDivElement>(null);

  const [menuAlignmentStyle, setMenuAlignmentStyle] = useState<CSSProperties>(
    getMenuAlignmentStyle({ menuAlignment: menuAlignment, menuRef, toggleRef }),
  );
  const deviceType: 'mobile' | 'desktop' = isModalDropdownContainerForMobileDevice ? getDeviceType() : 'desktop';

  const handleToggleClick = () => {
    if (!disabled) setIsOpened((state) => !state);
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
      const alignmentStyle = getMenuAlignmentStyle({ menuAlignment: alignment, menuRef, toggleRef });
      setMenuAlignmentStyle({ ...alignmentStyle, maxHeight });
    }
  }, 100);

  useClickOutside({
    elementRef: [toggleRef, menuRef, ...(additionalRefsForClickOutsideIgnore ?? [])],
    onClickOutside: handleOutsideClick,
  });

  useLayoutEffect(() => {
    if (isOpened) {
      const { alignment, maxHeight } = getPositionedMenuAlignment({ toggleRef, menuRef, menuAlignment });
      const alignmentStyle = getMenuAlignmentStyle({ menuAlignment: alignment, menuRef, toggleRef });
      setMenuAlignmentStyle({ ...alignmentStyle, maxHeight });
    }
  }, [isOpened, DropdownMenu, toggleRef.current, menuRef.current]);

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
    <>
      <div
        ref={toggleRef}
        onClick={handleToggleClick}
        style={{ width: 'fit-content', height: 'fit-content', ...dropdownDivContainerProps?.style }}
        className={dropdownDivContainerProps?.className}
      >
        {DropdownToggle}
      </div>

      {isOpened &&
        deviceType === 'desktop' &&
        createPortal(
          <div
            ref={menuRef}
            onClick={handleMenuClick}
            style={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              zIndex: zIndex,
              overflowY: 'auto',
              ...menuAlignmentStyle,
            }}
          >
            {DropdownMenu}
          </div>,
          portalContainer ? portalContainer : document.body,
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
    </>
  );
};
