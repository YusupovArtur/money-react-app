import { FC } from 'react';

interface TransactionsTableHeadProps {}

export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({}) => {
  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: '110px' }}>Дата</th>

        {/*Icon*/}
        <th style={{ width: '38.8px' }}></th>

        {/*Sum*/}
        <th>Сумма</th>

        {/*Wallets*/}
        <th colSpan={2}>Счета</th>

        {/*Category*/}
        <th colSpan={2}>Категория</th>

        {/*Subcategory*/}
        <th>Подкатегория</th>
      </tr>
    </thead>
  );
};
