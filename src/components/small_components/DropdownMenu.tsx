import React, { ReactNode } from 'react';

const DropdownMenu: React.FC<{ children1: ReactNode; children2: ReactNode }> = ({ children1, children2 }) => {
  return (
    <div>
      {children1}
      {children2}
    </div>
  );
};

export default DropdownMenu;
