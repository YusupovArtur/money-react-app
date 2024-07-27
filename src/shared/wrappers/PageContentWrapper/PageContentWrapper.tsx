import { CSSProperties, FC, HTMLProps, ReactNode } from 'react';

interface PageContentWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const PageContentWrapper: FC<PageContentWrapperProps> = (props) => {
  const { className = '', style = {}, children, ...restProps } = props;
  const { maxWidth = '45rem', ...restStyle } = style as CSSProperties;

  return (
    <div
      style={{ width: '100vw', maxWidth: maxWidth, ...restStyle }}
      className={`d-flex flex-column bg-body-tertiary rounded-4 shadow-sm p-3 ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default PageContentWrapper;
