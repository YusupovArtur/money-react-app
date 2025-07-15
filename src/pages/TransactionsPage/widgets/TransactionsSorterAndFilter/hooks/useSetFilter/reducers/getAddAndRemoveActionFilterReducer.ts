import { getCurrentFilterSet } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/reducers/getCurrentFilterSet.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterReducerActionType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';
import { isSet } from 'shared/helpers';

export const getAddAndRemoveActionFilterReducer = <T extends keyof TransactionType>(fieldKey: T) => {
  return (
    state: TransactionsFilterType<keyof TransactionType>,
    action: FilterReducerActionType<T>,
  ): TransactionsFilterType<keyof TransactionType> => {
    const currentSet = getCurrentFilterSet({ fieldKey: fieldKey, filter: state });

    switch (action.type) {
      case 'add':
        if (!isSet(action.payload) && !Array.isArray(action.payload)) {
          currentSet.delete(action.payload);
        } else {
          action.payload.forEach((option) => {
            currentSet.delete(option);
          });
        }
        return { key: fieldKey, filter: currentSet as any };

      case 'remove':
        if (!isSet(action.payload) && !Array.isArray(action.payload)) {
          currentSet.add(action.payload);
        } else {
          action.payload.forEach((option) => {
            currentSet.add(option);
          });
        }
        return { key: fieldKey, filter: currentSet as any };

      default:
        return state;
    }
  };
};
