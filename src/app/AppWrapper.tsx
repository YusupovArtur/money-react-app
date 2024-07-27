import { FC, ReactNode } from 'react';
import { useAppSelector } from 'store/hook.ts';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const themeDisplay = useAppSelector((state) => state.theme.themeDisplay);

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      className="min-vh-100 bg-body-secondary d-flex flex-column"
      data-bs-theme={themeDisplay}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
