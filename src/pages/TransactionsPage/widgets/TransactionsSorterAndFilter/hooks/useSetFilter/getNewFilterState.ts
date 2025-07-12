import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { isSet } from 'shared/helpers';
import { FilterDispatcherCommandType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/types.ts';

export const getNewFilterState = <T extends keyof TransactionType>(props: {
  fieldKey: T;
  filter: TransactionsFilterType<keyof TransactionType>;
  command: FilterDispatcherCommandType<T>;
}): TransactionsFilterType<T> => {
  const { fieldKey, filter, command } = props;
  const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filters: filter });

  const currentSet =
    fieldKey === filter.key && isSet<TransactionType[T]>(filter.filter)
      ? filter.filter
      : (new Set<TransactionType[T]>() as Set<TransactionType[T]>);

  switch (command.type) {
    case 'delete':
    case 'deleteAll':
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
      return { key: fieldKey, filter: command.option as any };

    default:
      return currentFilter;
  }
};
