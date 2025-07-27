import { FC, ReactNode } from 'react';
import { MainPagePieChartFilterContextProvider } from 'app/hooks/useAppContext/useMainPagePieChartFilterContext.tsx';
import { getInitialPieChartTimeFilter } from 'pages/MainPage/widgets/PieChartWidget/helpers/getInitialPieChartTimeFilter.ts';
import { TransactionsPageFilterContextProvider } from 'app/hooks/useAppContext/useTransactionsPageFilterContext.tsx';
import { TransactionsPageSortContextProvider } from 'app/hooks/useAppContext/useTransactionsPageSortContext.tsx';

interface UseAppContextProps {
  children: ReactNode;
}

export const AppContextProvider: FC<UseAppContextProps> = ({ children }) => {
  return (
    <MainPagePieChartFilterContextProvider initialState={[{ key: 'time', filter: getInitialPieChartTimeFilter('month') }]}>
      <TransactionsPageFilterContextProvider>
        <TransactionsPageSortContextProvider initialState={{ key: 'time', order: 'desc' }}>
          {children}
        </TransactionsPageSortContextProvider>
      </TransactionsPageFilterContextProvider>
    </MainPagePieChartFilterContextProvider>
  );
};
