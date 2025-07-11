import { Dispatch, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import {
  RangeFilterType,
  TransactionsFilterType,
} from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

export interface FilterDispatcherType<T extends keyof TransactionType> {
  (command: FilterDispatcherCommandType<T>): void;
}

type FilterDispatcherCommandType<T extends keyof TransactionType> =
  | { type: 'delete' }
  | { type: 'setAll' }
  | { type: 'setNone'; options: TransactionType[T][] }
  | { type: 'add'; option: TransactionType[T] | Set<TransactionType[T]> }
  | { type: 'remove'; option: TransactionType[T] | Set<TransactionType[T]> }
  | { type: 'range'; option: RangeFilterType };

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
          if (!(command.option instanceof Set)) {
            currentSet.delete(command.option);
          } else {
            command.option.forEach((option) => {
              currentSet.delete(option);
            });
          }
          return { key: fieldKey, filter: currentSet as any };

        case 'remove':
          if (!(command.option instanceof Set)) {
            currentSet.add(command.option);
          } else {
            command.option.forEach((option) => {
              currentSet.add(option);
            });
          }
          return { key: fieldKey, filter: currentSet as any };

        case 'range':
          return { key: fieldKey, filter: command.option };

        default:
          return state;
      }
    });
  };
};
