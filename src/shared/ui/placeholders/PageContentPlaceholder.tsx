import { FC, HTMLAttributes } from 'react';

interface PageContentPlaceholderProps extends HTMLAttributes<HTMLParagraphElement> {
  blockHeight?: string | number;
}

export const PageContentPlaceholder: FC<PageContentPlaceholderProps> = ({ className, blockHeight = '3.2rem' }) => {
  return (
    <p className={`placeholder-wave ${className || ''}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ height: blockHeight }} className="placeholder col-12 mb-1"></span>
      ))}
      <span style={{ height: blockHeight }} className="placeholder col-12"></span>
    </p>
  );
};
