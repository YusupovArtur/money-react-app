import React, { useState, ReactNode } from 'react';

const DropdownMenu: React.FC<{ DropdownButton: ReactNode; DropdownItem: ReactNode }> = ({ DropdownButton, DropdownItem }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <div style={{ position: 'relative' }} onClick={() => setIsOpened((state) => !state)}>
        {DropdownButton}
      </div>
      {isOpened && <div style={{ position: 'absolute' }}>{DropdownItem}</div>}
    </>
  );
};

export default DropdownMenu;
