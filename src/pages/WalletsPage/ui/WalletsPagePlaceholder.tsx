import { FC } from 'react';
import { PageContentPlaceholder, PageContentWrapper } from 'shared/ui';

export const WalletsPagePlaceholder: FC = () => {
  return (
    <PageContentWrapper style={{ margin: '0 auto' }}>
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-primary disabled placeholder col-2"></button>
        <button className="btn btn-primary disabled placeholder col-2"></button>
      </div>
      <div className="mb-2">
        <button className="btn btn-success disabled placeholder col-4"></button>
      </div>
      <PageContentPlaceholder className="m-0" />
    </PageContentWrapper>
  );
};
