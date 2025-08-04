import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/FilterDispatcherType.ts';
import { getRangeFilterFromFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getRangeFilterFromFilter.ts';

export const getSetRangeActionFilterReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>,
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType> => {
    if (action.type === 'setRange') {
      if (action.payload[1] === undefined && action.payload[2] === undefined) {
        return state;
      } else {
        const range = getRangeFilterFromFilter({ fieldKey: fieldKey, filter: state });

        if (action.payload[1] !== undefined) {
          range[1] = action.payload[1];
        }
        if (action.payload[2] !== undefined) {
          range[2] = action.payload[2];
        }

        return { key: fieldKey, filter: range };
      }
    }

    return state;
  };
};
