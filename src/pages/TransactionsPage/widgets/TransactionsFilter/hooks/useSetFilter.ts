import { Dispatch, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';

export interface FilterDispatcherType<T extends keyof TransactionType> {
  (command: FilterDispatcherCommandType<T>): void;
}

type FilterDispatcherCommandType<T extends keyof TransactionType> =
  | { type: 'delete' }
  | { type: 'setAll' }
  | { type: 'setNone'; options: TransactionType[T][] }
  | { type: 'add'; option: TransactionType[T] }
  | { type: 'remove'; option: TransactionType[T] };

const isSet = <T>(value: unknown): value is Set<T> => {
  return value instanceof Set;
};

export const useSetFilter = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  setFilter: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>>>;
}): FilterDispatcherType<T> => {
  const { fieldKey, setFilter } = props;

  return (command) => {
    setFilter((state) => {
      const currentSet =
        fieldKey === state.key && isSet<TransactionType[T]>(state.filter)
          ? state.filter
          : (new Set<TransactionType[T]>() as Set<TransactionType[T]>);

      switch (command.type) {
        case 'delete':
          return { key: fieldKey, filter: null as any };

        case 'setAll':
          return { key: fieldKey, filter: new Set() as any };

        case 'setNone':
          return { key: fieldKey, filter: new Set(command.options) as any };

        case 'add':
          currentSet.delete(command.option);
          return { key: fieldKey, filter: currentSet as any };

        case 'remove':
          currentSet.add(command.option);
          return { key: fieldKey, filter: currentSet as any };

        default:
          return state;
      }
    });
  };
};
