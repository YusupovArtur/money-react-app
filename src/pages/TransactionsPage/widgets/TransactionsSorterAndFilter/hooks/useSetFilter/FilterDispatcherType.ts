import { TransactionType } from 'store/slices/transactionsSlice';
import { RangeFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export interface FilterDispatcherType<T extends keyof TransactionType> {
  (action: FilterReducerActionType<T>): void;
}

export type FilterReducerActionType<T extends keyof TransactionType> =
  | { type: 'delete' }
  | { type: 'deleteAll' }
  | { type: 'setAll' }
  | { type: 'add'; payload: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]> }
  | { type: 'remove'; payload: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]> }
  | { type: 'range'; payload: RangeFilterType };
