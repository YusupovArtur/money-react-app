import { Dispatch, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';
import { getFilterReducer } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/reducers/getFilterReducer.ts';
import { getFilterArrayReducer } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/reducers/getFilterArrayReducer.ts';

interface SignatureWithFilter {
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
  setFilters?: never;
}

interface SignatureWithFilterArray {
  setFilter?: never;
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const useFilterDispatch = <T extends keyof TransactionType>(
  props: {
    fieldKey: T;
  } & (SignatureWithFilter | SignatureWithFilterArray),
): FilterDispatcherType<T> => {
  const { fieldKey, setFilter, setFilters } = props;

  if (setFilter !== undefined) {
    return (action) => {
      setFilter((state) => getFilterReducer(fieldKey)(state, action));
    };
  } else {
    return (action) => {
      setFilters((state) => getFilterArrayReducer(fieldKey)(state, action));
    };
  }
};
