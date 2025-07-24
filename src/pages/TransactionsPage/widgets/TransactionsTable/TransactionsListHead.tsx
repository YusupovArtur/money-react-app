import { FC } from 'react';
// Components
import { TransactionsTableSortingFilteringMenu } from 'widgets/TransactionsSortingFilteringMenu/TransactionsSortingFilteringMenu.tsx';

export const TransactionsListHead: FC = () => {
  return (
    <div className="d-flex gap-2">
      {/*Time*/}
      <div style={{ width: '25%' }}>
        <TransactionsTableSortingFilteringMenu fieldKey="time" />
      </div>

      {/*Type*/}
      <div style={{ width: '25%' }}>
        <TransactionsTableSortingFilteringMenu fieldKey="type" />
      </div>

      {/*Sum*/}
      <div style={{ width: '25%' }}>
        <TransactionsTableSortingFilteringMenu fieldKey="sum" />
      </div>

      {/*Category*/}
      <div style={{ width: '25%' }}>
        <TransactionsTableSortingFilteringMenu fieldKey="category" />
      </div>
    </div>
  );
};
