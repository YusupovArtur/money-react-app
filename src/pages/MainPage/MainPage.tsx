import { FC, useState } from 'react';
import { PageContentWrapper } from 'shared/ui';
import { WalletsWidget } from 'pages/MainPage/widgets/WalletsWidget/WalletsWidget.tsx';
import { TransactionInputWidget } from 'widgets/TransactionsInput';
import { DateInput } from 'shared/inputs';

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const [timestamp, setTimestamp] = useState(NaN);

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }}>
        <WalletsWidget />

        <DateInput timestamp={timestamp} setTimestamp={setTimestamp}></DateInput>
      </PageContentWrapper>

      <TransactionInputWidget />
    </>
  );
};
