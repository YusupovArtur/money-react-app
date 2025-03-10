import { Dispatch, FC, SetStateAction } from 'react';
import { DropdownMenuWrapper } from 'shared/ui';
import { SortingOrderInput } from './SortingOrderInput.tsx';
import { TransactionsSortingOrderType } from '../types/TransactionsSortingOrderType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { DropdownContainer } from 'shared/containers';
import { TableHeadCellButton } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableHeadCellButton.tsx';
import { getFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsFilter/helpers/getFilterOptionsList.ts';
import { TableFilterOptionsMenu } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TableFilterOptionsMenu.tsx';

interface TableFilterMenuProps {
  fieldKey: keyof TransactionType;
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
  order: string[];
}

const captions: Record<keyof TransactionType, string> = {
  time: 'Дата',
  type: 'Тип',
  sum: 'Сумма',
  fromWallet: 'Счет',
  toWallet: 'Счет',
  category: 'Категория',
  subcategory: 'Подкатегория',
  description: 'Описание',
};

export const TableFilterMenu: FC<TableFilterMenuProps> = ({ fieldKey, sortingOrder, setSortingOrder, order }) => {
  const options = getFilterOptionsList({ key: fieldKey, order: order });

  return (
    <DropdownContainer
      isInsideClickClose={false}
      isModalForMobileDevice={true}
      DropdownToggle={<TableHeadCellButton caption={captions[fieldKey]} fieldKey={fieldKey} sortingOrder={sortingOrder} />}
      DropdownMenu={
        <DropdownMenuWrapper style={{ fontWeight: 'normal' }}>
          <SortingOrderInput fieldKey={fieldKey} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
          <TableFilterOptionsMenu
            fieldKey={fieldKey}
            options={options.options}
            optionKeys={options.optionKeys}
          ></TableFilterOptionsMenu>
        </DropdownMenuWrapper>
      }
    />
  );
};
