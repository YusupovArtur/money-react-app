import { getAddAndRemoveActionFilterReducer } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/reducers/getAddAndRemoveActionFilterReducer.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/FilterDispatcherType.ts';
import { getSetRangeActionFilterReducer } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/reducers/getSetRangeActionFilterReducer.ts';

export const getFilterArrayReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>[],
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType>[] => {
    let newFilters = [...state];

    let flag: boolean = true;
    switch (action.type) {
      case 'delete':
        newFilters = newFilters.filter((filter) => filter.key !== fieldKey);
        break;

      case 'deleteAll':
        newFilters = [];
        break;

      case 'setNull':
        newFilters = newFilters.map((filter) => {
          if (filter.key !== fieldKey) {
            return filter;
          } else {
            return { key: fieldKey, filter: null };
          }
        });
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

      case 'add':
      case 'remove':
        flag = true;
        newFilters = newFilters.map((filter) => {
          if (filter.key !== fieldKey) {
            return filter;
          } else {
            flag = false;
            return getAddAndRemoveActionFilterReducer(fieldKey)(filter, action);
          }
        });
        if (flag) {
          newFilters.push(getAddAndRemoveActionFilterReducer(fieldKey)({ key: fieldKey, filter: null }, action));
        }
        break;

      case 'setRange':
        flag = true;
        newFilters = newFilters.map((filter) => {
          if (filter.key !== fieldKey) {
            return filter;
          } else {
            flag = false;
            return getSetRangeActionFilterReducer(fieldKey)(filter, action);
          }
        });
        if (flag) {
          // newFilters.push({ key: fieldKey, filter: action.payload });
          newFilters.push(getSetRangeActionFilterReducer(fieldKey)({ key: fieldKey, filter: null }, action));
        }
        break;
    }

    return newFilters;
  };
};
