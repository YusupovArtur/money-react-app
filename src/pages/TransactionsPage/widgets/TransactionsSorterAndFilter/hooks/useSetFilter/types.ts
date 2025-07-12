import { TransactionType } from 'store/slices/transactionsSlice';
import { RangeFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export interface FilterDispatcherType<T extends keyof TransactionType> {
  (command: FilterDispatcherCommandType<T>): void;
}

export type FilterDispatcherCommandType<T extends keyof TransactionType> =
  | { type: 'delete' }
  | { type: 'deleteAll' }
  | { type: 'setAll' }
  | { type: 'setNone'; options: TransactionType[T][] }
  | { type: 'add'; option: TransactionType[T] | Set<TransactionType[T]> }
  | { type: 'remove'; option: TransactionType[T] | Set<TransactionType[T]> }
  | { type: 'range'; option: RangeFilterType };
