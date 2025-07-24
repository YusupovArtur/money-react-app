import { ChangeEvent } from 'react';
// Components
import { FilteringCheckboxOption } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringCheckboxInput/FilteringCheckboxOption.tsx';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { isRangeFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/isRangeFilter.ts';
import { isSet } from 'shared/helpers';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionFieldCaptionKeyType.ts';

interface FilteringCheckboxInputProps<T extends keyof TransactionType> {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
}

export const FilteringCheckboxInput = <T extends keyof TransactionType>({
  fieldKey,
  options,
  optionKeys,
}: FilteringCheckboxInputProps<T>) => {
  const { setFilters, currentFilters } = useTransactionsFilteringContext();
  const filterDispatch = useFilterDispatch({ fieldKey: fieldKey, setFilters: setFilters });
  const filter = currentFilters[fieldKey] !== undefined ? currentFilters[fieldKey].filter : null;

  const optionChangeHandler =
    (option: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        filterDispatch({ type: 'add', payload: option });
      } else {
        filterDispatch({ type: 'remove', payload: option });
      }
    };

  const optionsInputDisabled = filter !== null && isRangeFilter(filter) && (!isNaN(filter.min) || !isNaN(filter.max));

  return (
    <>
      {options.map((option, index) => {
        return (
          <FilteringCheckboxOption
            key={index.toString() + option.toString()}
            fieldKey={fieldKey}
            checked={!filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option))}
            optionKey={optionKeys[option]}
            disabled={optionsInputDisabled}
            onChange={optionChangeHandler(option)}
          />
        );
      })}
    </>
  );
};
