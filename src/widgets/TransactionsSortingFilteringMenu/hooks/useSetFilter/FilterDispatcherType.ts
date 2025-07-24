import { TransactionType } from 'store/slices/transactionsSlice';
import { RangeFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { AtLeastOneType } from 'shared/types';

export interface FilterDispatcherType<T extends keyof TransactionType> {
  (action: FilterReducerActionType<T>): void;
}

export type FilterReducerActionType<T extends keyof TransactionType> =
  | { type: 'delete' }
  | { type: 'setNull' }
  | { type: 'deleteAll' }
  | { type: 'setAll' }
  | { type: 'add'; payload: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]> }
  | { type: 'remove'; payload: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]> }
  | { type: 'setRange'; payload: AtLeastOneType<RangeFilterType> };
