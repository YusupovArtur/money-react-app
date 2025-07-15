import { FC } from 'react';
import { PageContentWrapper } from 'shared/ui';
import { WalletsWidget } from 'pages/MainPage/widgets/WalletsWidget/WalletsWidget.tsx';
import { TransactionInputWidget } from 'widgets/TransactionsInput';

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }}>
        <WalletsWidget />
      </PageContentWrapper>

      <TransactionInputWidget />
    </>
  );
};
