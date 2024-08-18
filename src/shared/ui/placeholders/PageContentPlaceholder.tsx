import { FC, HTMLAttributes } from 'react';

interface PageContentPlaceholderProps extends HTMLAttributes<HTMLParagraphElement> {}

export const PageContentPlaceholder: FC<PageContentPlaceholderProps> = ({ className }) => {
  return (
    <p className={`placeholder-wave ${className ? className : ''}`}>
      <span style={{ height: '3.2rem' }} className="placeholder col-12 mb-1"></span>
      <span style={{ height: '3.2rem' }} className="placeholder col-12 mb-1"></span>
      <span style={{ height: '3.2rem' }} className="placeholder col-12 mb-1"></span>
      <span style={{ height: '3.2rem' }} className="placeholder col-12"></span>
    </p>
  );
};
