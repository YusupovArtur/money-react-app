import { FC } from 'react';
import { PageContentWrapper } from 'shared/ui';

export const CategoryEditPlaceholder: FC = ({}) => {
  return (
    <PageContentWrapper style={{ margin: '0 auto' }}>
      <button type="button" className="btn-close position-absolute disabled align-self-end"></button>
      <button className="btn btn-primary disabled placeholder col-3"></button>

      <p className="d-flex flex-column placeholder-wave my-4">
        <span style={{ height: '1.6rem' }} className="placeholder col-6 mb-2"></span>
        <span style={{ height: '1.6rem' }} className="placeholder col-5 mb-2"></span>
        <span style={{ height: '1.6rem' }} className="placeholder col-7 mb-4"></span>
        <span style={{ height: '1.6rem' }} className="placeholder mb-2"></span>
        <span style={{ height: '1.6rem' }} className="placeholder mb-2"></span>
        <span style={{ height: '1.6rem' }} className="placeholder"></span>
      </p>

      <div className="d-flex mb-5">
        <button className="btn btn-primary disabled placeholder flex-grow-1 me-2"></button>
        <button className="btn btn-danger disabled placeholder col-3"></button>
      </div>

      <p className="d-flex flex-column placeholder-wave m-0">
        <span style={{ height: '2rem' }} className="placeholder bg-info mb-2"></span>
        <span style={{ height: '2rem' }} className="placeholder bg-info mb-2"></span>
        <span style={{ height: '2rem' }} className="placeholder bg-info mb-2"></span>
        <span style={{ height: '2rem' }} className="placeholder bg-info"></span>
      </p>
    </PageContentWrapper>
  );
};
