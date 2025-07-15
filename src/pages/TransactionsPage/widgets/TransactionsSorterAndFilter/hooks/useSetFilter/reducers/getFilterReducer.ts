import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { getAddAndRemoveActionFilterReducer } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/reducers/getAddAndRemoveActionFilterReducer.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';

export const getFilterReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>,
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType> => {
    const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: state });

    switch (action.type) {
      case 'delete':
      case 'deleteAll':
        return { key: fieldKey, filter: null as any };

      case 'setAll':
        return { key: fieldKey, filter: new Set() as any };

      case 'add':
      case 'remove':
        return getAddAndRemoveActionFilterReducer(fieldKey)(state, action);

      case 'range':
        return { key: fieldKey, filter: action.payload as any };

      default:
        return currentFilter;
    }
  };
};
