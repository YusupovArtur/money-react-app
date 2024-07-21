import { CSSProperties, FC } from 'react';

const PageLoadingSpinner: FC = () => {
  const spinnerSize: CSSProperties = {
    width: '4.5rem',
    height: '4.5rem',
    borderWidth: '0.5rem',
  };

  return (
    <div className="spinner-border text-body" role="status" style={spinnerSize}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default PageLoadingSpinner;
