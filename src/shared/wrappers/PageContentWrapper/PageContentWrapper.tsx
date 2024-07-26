import { CSSProperties, FC, HTMLProps, ReactNode } from 'react';

interface PageContentWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const PageContentWrapper: FC<PageContentWrapperProps> = (props) => {
  const { className, style, children, ...rest } = props;
  const { maxWidth = '45rem', ...restStyle } = style as CSSProperties;

  return (
    <div
      style={{ maxWidth: maxWidth, width: '100vw', ...restStyle }}
      className={`align-self-start bg-body-tertiary rounded-4 shadow-sm p-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageContentWrapper;
