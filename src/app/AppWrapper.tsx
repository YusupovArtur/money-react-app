import { FC, ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      className="min-vh-100 bg-body-secondary d-flex flex-column"
    >
      {children}
    </div>
  );
};
