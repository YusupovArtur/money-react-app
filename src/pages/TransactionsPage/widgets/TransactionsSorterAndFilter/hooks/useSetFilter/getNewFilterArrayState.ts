import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterDispatcherCommandType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/types.ts';
import { getNewFilterState } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/getNewFilterState.ts';

export const getNewFilterArrayState = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filters: TransactionsFilterType<keyof TransactionType>[];
  command: FilterDispatcherCommandType<T>;
}): TransactionsFilterType<keyof TransactionType>[] => {
  const { fieldKey, filters, command } = props;

  let newFilters = [...filters];

  let flag: boolean = true;
  switch (command.type) {
    case 'delete':
      newFilters = newFilters.filter((filter) => filter.key !== fieldKey);
      break;

    case 'deleteAll':
      newFilters = [];
      break;

    case 'setAll':
      flag = true;
      newFilters = newFilters.map((filter) => {
        if (filter.key !== fieldKey) {
          return filter;
        } else {
          flag = false;
          return { key: fieldKey, filter: new Set() as any };
        }
      });
      if (flag) {
        newFilters.push({ key: fieldKey, filter: new Set() as any });
      }
      break;

    case 'setNone':
      flag = true;
      newFilters = newFilters.map((filter) => {
        if (filter.key !== fieldKey) {
          return filter;
        } else {
          flag = false;
          return { key: fieldKey, filter: new Set(command.options) as any };
        }
      });
      if (flag) {
        newFilters.push({ key: fieldKey, filter: new Set(command.options) as any });
      }
      break;

    case 'add':
      flag = true;
      newFilters = newFilters.map((filter) => {
        if (filter.key !== fieldKey) {
          return filter;
        } else {
          flag = false;
          return getNewFilterState({ fieldKey: fieldKey, filter: filter, command });
        }
      });
      if (flag) {
        newFilters.push(getNewFilterState({ fieldKey: fieldKey, filter: { key: fieldKey, filter: null }, command }));
      }
      break;

    case 'remove':
      flag = true;
      newFilters = newFilters.map((filter) => {
        if (filter.key !== fieldKey) {
          return filter;
        } else {
          flag = false;
          return getNewFilterState({ fieldKey: fieldKey, filter: filter, command });
        }
      });
      if (flag) {
        newFilters.push(getNewFilterState({ fieldKey: fieldKey, filter: { key: fieldKey, filter: null }, command }));
      }
      break;

    case 'range':
      flag = true;
      newFilters = newFilters.map((filter) => {
        if (filter.key !== fieldKey) {
          return filter;
        } else {
          flag = false;
          return { key: fieldKey, filter: command.option };
        }
      });
      if (flag) {
        newFilters.push({ key: fieldKey, filter: command.option });
      }
      break;
  }

  return newFilters;
};
