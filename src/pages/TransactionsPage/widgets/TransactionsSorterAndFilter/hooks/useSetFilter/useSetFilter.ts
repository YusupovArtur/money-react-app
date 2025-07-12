import { Dispatch, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/types.ts';
import { getNewFilterState } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/getNewFilterState.ts';
import { getNewFilterArrayState } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/getNewFilterArrayState.ts';

interface UseSetFilterSignatureWithSetFilter {
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
  setFilters?: never;
}

interface UseSetFilterSignatureWithSetFilters {
  setFilter?: never;
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const useSetFilter = <T extends keyof TransactionType>(
  props: {
    fieldKey: T;
  } & (UseSetFilterSignatureWithSetFilter | UseSetFilterSignatureWithSetFilters),
): FilterDispatcherType<T> => {
  const { fieldKey, setFilter, setFilters } = props;

  if (setFilter !== undefined) {
    return (command) => {
      setFilter((state) => getNewFilterState({ fieldKey: fieldKey, filter: state, command: command }));
    };
  } else {
    return (command) => {
      setFilters((state) => getNewFilterArrayState({ fieldKey: fieldKey, filters: state, command: command }));
    };
  }
};
