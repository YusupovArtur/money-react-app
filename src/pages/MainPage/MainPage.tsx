import { FC, useEffect, useState } from 'react';
import { PageContentWrapper } from 'shared/ui';
import { WalletsWidget } from 'pages/MainPage/widgets/WalletsWidget/WalletsWidget.tsx';
import { TransactionInputWidget } from 'widgets/TransactionsInput';
import { BalanceWidget } from 'pages/MainPage/widgets/BalanceWidget/BalanceWidget.tsx';
import { PieChartWidget } from 'pages/MainPage/widgets/PieChartWidget/PieChartWidget.tsx';

export const MainPage: FC = () => {
  const [width, setWidth] = useState<string>('100%');

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 74 * 16 && window.innerWidth > 46 * 16) {
        // 1rem = 16px по умолчанию
        setWidth('45rem');
      } else {
        setWidth('100%');
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="mt-2">
        <BalanceWidget />
      </PageContentWrapper>

      <PageContentWrapper style={{ margin: '0 auto' }} className="mt-2">
        <WalletsWidget />
      </PageContentWrapper>

      <PageContentWrapper style={{ margin: '0 auto', maxWidth: '72.5rem', width: width }} className="mt-2">
        <PieChartWidget />
      </PageContentWrapper>

      <TransactionInputWidget />
    </>
  );
};
