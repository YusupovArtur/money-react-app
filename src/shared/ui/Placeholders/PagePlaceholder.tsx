import { CSSProperties, FC } from 'react';
import { PageContentWrapper } from 'shared/wrappers';
import { PageContentPlaceholder } from 'shared/ui';

interface PagePlaceholderProps {
  style?: CSSProperties;
}

export const PagePlaceholder: FC<PagePlaceholderProps> = ({ style = { margin: '0 auto' } }) => {
  return (
    <PageContentWrapper style={style}>
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary disabled placeholder col-3"></button>
        <button className="btn btn-primary disabled placeholder col-2"></button>
      </div>
      <PageContentPlaceholder />
      <button className="btn btn-danger disabled placeholder col-3 align-self-end"></button>
    </PageContentWrapper>
  );
};
