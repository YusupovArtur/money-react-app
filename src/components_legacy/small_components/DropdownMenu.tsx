import React, { useEffect, useRef, ReactNode, useState } from 'react';

const getDropdownMenuPosition = (alignmentY: 'bottom' | 'top', alignmentX: 'left' | 'right'): React.CSSProperties => {
  if (alignmentY === 'bottom') {
    if (alignmentX === 'left') return { top: '100%', left: '0%', position: 'absolute', display: 'inline-block' };
    else return { top: '100%', right: '0%', position: 'absolute', display: 'inline-block' };
  } else {
    if (alignmentX === 'left') return { bottom: '100%', left: '0%', position: 'absolute', display: 'inline-block' };
    else return { bottom: '100%', right: '0%', position: 'absolute', display: 'inline-block' };
  }
};

const DropdownMenu: FC<{
  DropdownToggle: ReactNode;
  DropdownMenu: ReactNode;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  openFunction?: () => void;
  closeFunction?: () => void;
  isCloseWhenClickInside?: boolean;
  isCloseWhenClickOutside?: boolean;
  menuAlignmentY?: 'bottom' | 'top';
  menuAlignmentX?: 'left' | 'right';
}> = ({
  DropdownToggle,
  DropdownMenu,
  isOpened,
  setIsOpened,
  openFunction,
  closeFunction,
  isCloseWhenClickInside = true,
  isCloseWhenClickOutside = true,
  menuAlignmentY = 'top',
  menuAlignmentX = 'left',
}) => {
  const dropdownToggleRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const [menuContainerStyle, setMenuContainerStyle] = useState<React.CSSProperties>(
    getDropdownMenuPosition(menuAlignmentY, menuAlignmentX),
  );

  const handleClickDropdownToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dropdownMenuRef.current || (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node))) {
      console.log('toggle');
      setIsOpened((state) => {
        if (!state && openFunction) openFunction();
        if (state && closeFunction) closeFunction();
        return !state;
      });
    }
  };

  const handleClickDropdownMenu = () => {
    if (isCloseWhenClickInside) {
      console.log('menu');
      if (closeFunction) closeFunction();
      setIsOpened(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isCloseWhenClickOutside &&
      dropdownToggleRef.current &&
      dropdownMenuRef.current &&
      !dropdownToggleRef.current.contains(event.target as Node) &&
      !dropdownMenuRef.current.contains(event.target as Node)
    ) {
      console.log('outside');
      if (closeFunction) closeFunction();
      setIsOpened(false);
    }
  };

  const handleScroll = () => {
    if (dropdownToggleRef && dropdownMenuRef) {
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('wheel', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <>
      <div onClick={handleClickDropdownToggle} ref={dropdownToggleRef} style={{ position: 'relative', display: 'inline-block' }}>
        {DropdownToggle}
        {isOpened && (
          <div onClick={handleClickDropdownMenu} ref={dropdownMenuRef} style={menuContainerStyle}>
            {DropdownMenu}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
