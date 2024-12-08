import { Dispatch, FC, SetStateAction } from 'react';
import { DropdownContainer } from 'shared/containers';
import { TransactionsSortingOrderType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsSortingOrderType.ts';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableHeadCellButton.tsx';
import { DropdownMenuWrapper } from 'shared/ui';
import { SortingOrderInput } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/SortingOrderInput.tsx';

interface TransactionsTableHeadProps {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
}

// @ts-ignore
export const TransactionsTableHead: FC<TransactionsTableHeadProps> = ({ sortingOrder, setSortingOrder }) => {
  return (
    <thead>
      <tr>
        {/*Time*/}
        <th style={{ width: '110px', padding: 0 }}>
          <DropdownContainer
            isInsideClickClose={false}
            isModalForMobileDevice={true}
            DropdownToggle={<TableHeadCellButton caption="Дата" fieldKey="time" sortingOrder={sortingOrder} />}
            DropdownMenu={
              <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
                <SortingOrderInput fieldKey="time" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
              </DropdownMenuWrapper>
            }
          />
        </th>

        {/*Type*/}
        <th style={{ width: '60px', padding: 0 }}>
          <DropdownContainer
            isInsideClickClose={false}
            isModalForMobileDevice={true}
            DropdownToggle={<TableHeadCellButton caption="Тип" fieldKey="type" sortingOrder={sortingOrder} />}
            DropdownMenu={
              <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
                <SortingOrderInput fieldKey="type" sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
              </DropdownMenuWrapper>
            }
          />
        </th>

        {/*Sum*/}
        <th style={{ padding: 0 }}>
          <DropdownContainer
            DropdownToggle={<TableHeadCellButton caption="Сумма" fieldKey="sum" sortingOrder={sortingOrder} />}
            DropdownMenu={
              <>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
              </>
            }
          />
        </th>

        {/*Wallets*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <DropdownContainer
            DropdownToggle={<TableHeadCellButton caption="Счета" fieldKey="fromWallet" sortingOrder={sortingOrder} />}
            DropdownMenu={<div>test</div>}
          />
        </th>

        {/*Category*/}
        <th colSpan={2} style={{ padding: 0 }}>
          <DropdownContainer
            DropdownToggle={<TableHeadCellButton caption="Категория" fieldKey="category" sortingOrder={sortingOrder} />}
            DropdownMenu={<div>test</div>}
          />
        </th>

        {/*Subcategory*/}
        <th style={{ padding: 0 }}>
          <DropdownContainer
            DropdownToggle={<TableHeadCellButton caption="Подкатегория" fieldKey="subcategory" sortingOrder={sortingOrder} />}
            DropdownMenu={<div>test</div>}
          />
        </th>
      </tr>
    </thead>
  );
};
