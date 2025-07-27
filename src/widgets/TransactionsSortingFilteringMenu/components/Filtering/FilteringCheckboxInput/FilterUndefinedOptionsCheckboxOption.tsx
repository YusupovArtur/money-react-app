import { ChangeEvent } from 'react';
import { FilteringCheckboxOption } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringCheckboxInput/FilteringCheckboxOption.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionFieldCaptionKeyType.ts';
import { isRangeFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/isRangeFilter.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { isSet, isSubset } from 'shared/helpers';
import { ExclamationIcon } from 'shared/icons';

interface FilterUndefinedOptionsCheckboxOptionProps<T extends keyof TransactionType> {
  fieldKey: T;
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
  undefinedOptionsSet: Set<TransactionType[T]>;
}

export const FilterUndefinedOptionsCheckboxOption = <T extends keyof TransactionType>({
  fieldKey,
  optionKeys,
  undefinedOptionsSet,
}: FilterUndefinedOptionsCheckboxOptionProps<T>) => {
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
  const undefinedChecked = filter === null || (isSet(filter) && !isSubset(filter, undefinedOptionsSet));

  return (
    <>
      {undefinedOptionsSet.size > 0 && (
        <>
          {(fieldKey === 'category' || fieldKey === 'subcategory') && (
            <span className="d-flex align-items-center">
              <ExclamationIcon iconSize="1rem" className="text-danger" />
              <span className="ms-1">Неизвестные</span>
            </span>
          )}

          <FilteringCheckboxOption
            fieldKey={fieldKey}
            checked={undefinedChecked}
            optionKey={optionKeys[undefinedOptionsSet.values().next().value as TransactionType[T]]}
            disabled={optionsInputDisabled}
            onChange={optionChangeHandler(undefinedOptionsSet)}
          />
        </>
      )}
    </>
  );
};
