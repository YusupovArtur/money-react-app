import { getCurrentFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getCurrentFilter.ts';
import { getAddAndRemoveActionFilterReducer } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/reducers/getAddAndRemoveActionFilterReducer.ts';
import { getSetRangeActionFilterReducer } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/reducers/getSetRangeActionFilterReducer.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/FilterDispatcherType.ts';

export const getFilterReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>,
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType> => {
    const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: state });

    switch (action.type) {
      case 'delete':
      case 'setNull':
      case 'deleteAll':
        return { key: fieldKey, filter: null as any };

      case 'setAll':
        return { key: fieldKey, filter: new Set() as any };

      case 'add':
      case 'remove':
        return getAddAndRemoveActionFilterReducer(fieldKey)(state, action);

      case 'setRange':
        return getSetRangeActionFilterReducer(fieldKey)(state, action);

      default:
        return currentFilter;
    }
  };
};
