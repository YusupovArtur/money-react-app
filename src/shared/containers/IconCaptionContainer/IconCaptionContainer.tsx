import { FC, HTMLProps, ReactNode } from 'react';

interface IconCaptionContainerProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  caption?: string;
}

export const IconCaptionContainer: FC<IconCaptionContainerProps> = ({ children, caption, className, ...props }) => {
  return (
    <div className={`d-flex justify-content-center align-items-center overflow-hidden ${className || ''}`} {...props}>
      {children}
      {caption && <span className={`flex-shrink-1 text-truncate ${children ? 'ms-1' : ''}`}>{caption}</span>}
    </div>
  );
};
