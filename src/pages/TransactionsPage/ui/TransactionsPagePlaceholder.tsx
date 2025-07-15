import { FC } from 'react';
import { useMediaQuery } from 'shared/hooks';
import { SMALL_WINDOW_MEDIA_QUERY } from 'pages/TransactionsPage/widgets/TransactionsTable/constants/MEDIA_QUERY_CONSTANTS.ts';
import { PageContentPlaceholder, PageContentWrapper } from 'shared/ui';

export const TransactionsPagePlaceholder: FC = () => {
  const isSmall = useMediaQuery(SMALL_WINDOW_MEDIA_QUERY);

  if (isSmall) {
    return (
      <PageContentWrapper style={{ margin: '0 auto', maxWidth: '100%' }}>
        <div className="d-flex justify-content-evenly mb-3">
          <button className="btn btn-secondary disabled placeholder col-3"></button>
          <button className="btn btn-secondary disabled placeholder col-3"></button>
          <button className="btn btn-secondary disabled placeholder col-3"></button>
        </div>
        <PageContentPlaceholder className="m-0" blockHeight="3.8056rem" />
      </PageContentWrapper>
    );
  }

  return (
    <PageContentWrapper style={{ margin: '0 auto', maxWidth: '100%' }}>
      <table className="transactions-table placeholder-wave">
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <tr key={i}>
              {[1, 2, 3, 4, 5].map((j) => (
                <td key={j}>
                  <span style={{ height: '1.625rem' }} className="placeholder col-12"></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </PageContentWrapper>
  );
};
