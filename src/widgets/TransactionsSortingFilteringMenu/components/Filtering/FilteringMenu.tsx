import { ChangeEvent, ReactNode, useId, useMemo } from 'react';
// Components
import { ButtonWithIcon } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { isSet } from 'shared/helpers';
import { getUndefinedFilterOptionsSet } from 'widgets/TransactionsSortingFilteringMenu/helpers/getUndefinedFilterOptionsSet.ts';
import { isRangeType } from 'shared/helpers';
import { getTransactionsFilterOptionsList } from 'widgets/TransactionsSortingFilteringMenu/helpers/getTransactionsFilterOptionsList.ts';
// UI
import { FilterIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/FilterIcon.tsx';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TrashFillIcon } from 'shared/icons';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionFieldCaptionKeyType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionFieldCaptionKeyType.ts';
import { getTypeCaption, TypeIcon } from 'entities/EntitiesComponents';
import { FilteringDateInput } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringDateInput.tsx';
import { FilteringSumInput } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringSumInput.tsx';
import { FilteringCheckboxInput } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringCheckboxInput/FilteringCheckboxInput.tsx';
import { FilterUndefinedOptionsCheckboxOption } from 'widgets/TransactionsSortingFilteringMenu/components/Filtering/FilteringCheckboxInput/FilterUndefinedOptionsCheckboxOption.tsx';

interface TransactionsTableFilteringMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  portalContainerForInternalDropdowns?: HTMLElement | null;
}

export const FilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  portalContainerForInternalDropdowns,
}: TransactionsTableFilteringMenuProps<T>): ReactNode => {
  const { currentFilters, filters, setFilters, ordersForFilterOptions, transactions } = useTransactionsFilteringContext();

  // Getting option with useMemo
  const { options, optionKeys, undefinedOptionsSet } = useMemo(() => {
    const { options, optionKeys } = getTransactionsFilterOptionsList({
      fieldKey: fieldKey,
      order: ordersForFilterOptions[fieldKey],
      list: transactions,
    });
    const undefinedOptionsSet = getUndefinedFilterOptionsSet({ fieldKey, options, optionKeys });
    const filteredOptions = options.filter((option) => !undefinedOptionsSet.has(option));
    return { options: filteredOptions, optionKeys, undefinedOptionsSet };
  }, [fieldKey, ordersForFilterOptions[fieldKey], transactions]);

  const filterDispatch = useFilterDispatch({ fieldKey: fieldKey, setFilters: setFilters });
  const filter = currentFilters[fieldKey] !== undefined ? currentFilters[fieldKey].filter : null;
  const currentFilter: TransactionsFilterType<T> = currentFilters[fieldKey] || { key: fieldKey, filter: filter as any };

  const allChecked =
    filter === null || (isSet(filter) && filter.size === 0) || (isRangeType(filter) && isNaN(filter[1]) && isNaN(filter[2]));

  // For category and subcategory split by type
  const optionsByCategoryTypes: Record<TransactionType['type'], TransactionType[T][]> = { expense: [], income: [], transfer: [] };
  if (fieldKey === 'category' || fieldKey === 'subcategory') {
    for (let option of options) {
      optionsByCategoryTypes[(optionKeys[option] as TransactionFieldCaptionKeyType<'category' | 'subcategory'>).type].push(
        option,
      );
    }
  }

  // Menu handlers
  const deleteFilterHandler = () => {
    filterDispatch({ type: 'delete' });
  };
  const deleteAllFiltersHandler = () => {
    if (filters.length > 1) filterDispatch({ type: 'deleteAll' });
  };
  const checkAllHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      filterDispatch({ type: 'setAll' });
    } else {
      filterDispatch({ type: 'remove', payload: options });
    }
  };

  const checkAllInputId = useId();
  return (
    <>
      <div className="d-flex mb-1">
        <ButtonWithIcon className="flex-grow-1 btn btn-body me-1" caption="Удалить фильтр" onClick={deleteFilterHandler}>
          <FilterIcon filter={currentFilter} iconSize="1rem" isIconForDeleteFilterButton={true} />
        </ButtonWithIcon>
        {filters.length !== undefined && (
          <ButtonWithIcon onClick={deleteAllFiltersHandler} className={`btn btn-body ${filters.length > 1 && 'text-danger'}`}>
            <TrashFillIcon iconSize="1rem" />
          </ButtonWithIcon>
        )}
      </div>

      {fieldKey === 'time' && (
        <FilteringDateInput fieldKey={fieldKey} portalContainerForInternalDropdowns={portalContainerForInternalDropdowns} />
      )}
      {fieldKey === 'sum' && <FilteringSumInput fieldKey={fieldKey} />}

      <div className="form-check mb-1">
        <input
          className="form-check-input"
          type="checkbox"
          checked={allChecked}
          onChange={checkAllHandler}
          id={checkAllInputId}
        />
        <label className="form-check-label flex-grow-1 w-100 fw-bold" htmlFor={checkAllInputId}>
          Выбрать все
        </label>
      </div>

      {fieldKey !== 'category' && fieldKey !== 'subcategory' && (
        <FilteringCheckboxInput fieldKey={fieldKey} options={options} optionKeys={optionKeys} />
      )}

      {(fieldKey === 'category' || fieldKey === 'subcategory') && (
        <>
          {(Object.keys(optionsByCategoryTypes) as TransactionType['type'][]).map((type) => {
            const options = optionsByCategoryTypes[type];
            if (options.length > 0) {
              return (
                <>
                  <span className="d-flex align-items-center">
                    <TypeIcon type={type} iconSize="1rem" />
                    <span className="ms-1">{getTypeCaption(type, 'ы')}</span>
                  </span>
                  <FilteringCheckboxInput fieldKey={fieldKey} options={options} optionKeys={optionKeys} />
                </>
              );
            }
          })}
        </>
      )}

      <FilterUndefinedOptionsCheckboxOption
        fieldKey={fieldKey}
        undefinedOptionsSet={undefinedOptionsSet}
        optionKeys={optionKeys}
      />
    </>
  );
};
