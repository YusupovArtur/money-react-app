import { JSX, memo } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'widgets/TransactionsSortingFilteringMenu/TransactionsSortingFilteringMenu.tsx';
import { DatePickerTimeFilteringMenu } from 'pages/MainPage/widgets/PieChartWidget/components/PieChartFilteringMenu/DatePickerTimeFilteringMenu.tsx';

export const PieChartFilteringMenu = memo((): JSX.Element => {
  return (
    <div className="d-flex mx-auto gap-2 mb-2" style={{ maxWidth: '43rem' }}>
      {/*Time*/}
      <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 0 }}>
        <DatePickerTimeFilteringMenu />
      </div>

      {/*Wallets*/}
      <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 0 }}>
        <TransactionsTableSortingFilteringMenu fieldKey="fromWallet" />
      </div>

      {/*Category*/}
      <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 0 }}>
        <TransactionsTableSortingFilteringMenu fieldKey="category" />
      </div>

      {/*Subcategory*/}
      <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 0 }}>
        <TransactionsTableSortingFilteringMenu fieldKey="subcategory" />
      </div>
    </div>
  );
});
