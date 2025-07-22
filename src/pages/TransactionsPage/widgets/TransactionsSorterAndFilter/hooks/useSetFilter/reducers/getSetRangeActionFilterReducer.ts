import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getRangeFilterFromFilter.ts';

export const getSetRangeActionFilterReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>,
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType> => {
    if (action.type === 'setRange') {
      if (action.payload.min === undefined && action.payload.max === undefined) {
        return state;
      } else {
        const range = getRangeFilterFromFilter({ fieldKey: fieldKey, filter: state });

        if (action.payload.min !== undefined) {
          range.min = action.payload.min;
        }
        if (action.payload.max !== undefined) {
          range.max = action.payload.max;
        }

        return { key: fieldKey, filter: range };
      }
    }

    return state;
  };
};
