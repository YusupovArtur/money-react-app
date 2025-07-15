import { ChangeEvent, ReactNode, useEffect, useId, useState } from 'react';
// Components
import { DateInput, NumberInput } from 'shared/inputs';
import { TransactionsFilterMenuOption } from './TransactionsFilterMenuOption.tsx';
import { ButtonWithIcon, EntityFieldLabel } from 'shared/ui';
// Helpers
import { deepEqual, isSet, isSubset } from 'shared/helpers';
import { getUndefinedFilterOptionsSet } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getUndefinedFilterOptionsSet.ts';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/isRangeFilterObject.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getRangeFilterFromFilter.ts';
// UI
import { FilterIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterIcon.tsx';
// Types
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/FilterDispatcherType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import {
  RangeFilterType,
  TransactionsFilterType,
} from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { TrashFillIcon } from 'shared/icons';

interface TransactionsTableFilteringMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
  filter: TransactionsFilterType<T>;
  filterDispatch: FilterDispatcherType<T>;
  filtersLength?: number;
  portalContainerForInternalDropdowns?: HTMLElement | null;
}

export const TransactionsTableFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  options,
  optionKeys,
  filter,
  filterDispatch,
  filtersLength,
  portalContainerForInternalDropdowns,
}: TransactionsTableFilteringMenuProps<T>): ReactNode => {
  const allChecked = filter.filter === null || (isSet(filter.filter) && filter.filter.size === 0);
  const rangeInputDisabled = isSet(filter.filter) && filter.filter.size > 0;
  const optionsInputDisabled = isRangeFilterObject(filter.filter) && (!isNaN(filter.filter.min) || !isNaN(filter.filter.max));

  // Undefined options logics
  const undefinedOptionsSet = getUndefinedFilterOptionsSet({ fieldKey, options, optionKeys });
  const undefinedChecked = filter.filter === null || (isSet(filter.filter) && !isSubset(filter.filter, undefinedOptionsSet));

  // Menu handlers
  const deleteFilterHandler = () => {
    filterDispatch({ type: 'delete' });
  };
  const deleteAllFiltersHandler = () => {
    if (filtersLength && filtersLength > 1) filterDispatch({ type: 'deleteAll' });
  };
  const clearFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      filterDispatch({ type: 'setAll' });
    } else {
      filterDispatch({ type: 'remove', payload: options });
    }
  };
  const optionChangeHandler =
    (option: TransactionType[T] | Set<TransactionType[T]>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        filterDispatch({ type: 'add', payload: option });
      } else {
        filterDispatch({ type: 'remove', payload: option });
      }
    };

  // Range filter logics
  const [rangeFilter, setRangeFilter] = useState<RangeFilterType>(getRangeFilterFromFilter({ fieldKey, filter }));
  const setRangeFilterHandler = (field: 'min' | 'max') => (value: number) => {
    setRangeFilter((state) => ({ ...state, [field]: value }));
  };
  useEffect(() => {
    if (!isNaN(rangeFilter.min) || !isNaN(rangeFilter.max)) {
      filterDispatch({ type: 'range', payload: rangeFilter });
    } else {
      if (isRangeFilterObject(filter.filter)) {
        filterDispatch({ type: 'setAll' });
      }
    }
  }, [rangeFilter.min, rangeFilter.max]);
  useEffect(() => {
    const currentFilter = getCurrentFilter({ fieldKey, filters: filter });
    if (currentFilter.filter === null || currentFilter.filter instanceof Set) {
      setRangeFilter({ min: NaN, max: NaN });
    }
    if (isRangeFilterObject(filter.filter)) {
      if (!deepEqual(filter.filter, rangeFilter)) {
        setRangeFilter(filter.filter);
      }
    }
  }, [filter]);

  const rangeInputId1 = useId();
  const rangeInputId2 = useId();
  const checkAllInputId = useId();
  const checkUndefinedOptionsInputId = useId();
  return (
    <>
      <div className="d-flex mt-3 mb-1">
        <ButtonWithIcon className="flex-grow-1 btn btn-body me-1" caption="Удалить фильтр" onClick={deleteFilterHandler}>
          <FilterIcon filter={filter} iconSize="1rem" isIconForDeleteFilterButton={true} />
        </ButtonWithIcon>
        {filtersLength !== undefined && (
          <ButtonWithIcon onClick={deleteAllFiltersHandler} className={`btn btn-body me-1 ${filtersLength > 1 && 'text-danger'}`}>
            <TrashFillIcon iconSize="1rem" />
          </ButtonWithIcon>
        )}
      </div>

      {fieldKey === 'time' && (
        <>
          <EntityFieldLabel className="align-self-start mx-1">До</EntityFieldLabel>
          <DateInput
            timestamp={rangeFilter.max}
            setTimestamp={setRangeFilterHandler('max')}
            isModalDropdownContainerForMobileDevice={true}
            disabled={rangeInputDisabled}
            dateTextInputProps={{ id: rangeInputId1, style: { fontSize: '1rem' } }}
            portalContainerForDropdownContainer={portalContainerForInternalDropdowns}
            dropdownContainerZIndex={4}
          />
          <EntityFieldLabel className="align-self-start mx-1">От</EntityFieldLabel>
          <DateInput
            timestamp={rangeFilter.min}
            setTimestamp={setRangeFilterHandler('min')}
            isModalDropdownContainerForMobileDevice={true}
            disabled={rangeInputDisabled}
            dateTextInputProps={{ id: rangeInputId2, style: { fontSize: '1rem' } }}
            dateInputsDivContainersProps={{ className: 'mb-2' }}
            portalContainerForDropdownContainer={portalContainerForInternalDropdowns}
            dropdownContainerZIndex={4}
          />
        </>
      )}

      {fieldKey === 'sum' && (
        <>
          <EntityFieldLabel className="align-self-start mx-1">До</EntityFieldLabel>
          <NumberInput
            id={rangeInputId1}
            number={rangeFilter.max}
            setNumber={setRangeFilterHandler('max')}
            isCanSetNaN={true}
            disabled={rangeInputDisabled}
            style={{ fontSize: '0.9rem' }}
          />
          <EntityFieldLabel className="align-self-start mx-1">От</EntityFieldLabel>
          <NumberInput
            id={rangeInputId2}
            number={rangeFilter.min}
            setNumber={setRangeFilterHandler('min')}
            isCanSetNaN={true}
            disabled={rangeInputDisabled}
            style={{ fontSize: '0.9rem' }}
            className="mb-2"
          />
        </>
      )}

      <div className="form-check mb-1">
        <input
          className="form-check-input"
          type="checkbox"
          checked={allChecked}
          onChange={clearFilterHandler}
          id={checkAllInputId}
        />
        <label className="form-check-label flex-grow-1 w-100 fw-bold" htmlFor={checkAllInputId}>
          Выбрать все
        </label>
      </div>

      {options.map((option, index) => {
        if (!undefinedOptionsSet.has(option)) {
          const key = fieldKey + index.toString() + option.toString();
          const checked = filter.filter === null ? true : isSet(filter.filter) ? !(filter.filter as Set<any>).has(option) : true;

          return (
            <div className="form-check" key={key}>
              <input
                type="checkbox"
                checked={checked}
                onChange={optionChangeHandler(option)}
                disabled={optionsInputDisabled}
                id={key}
                className="form-check-input"
              />
              <label className="form-check-label flex-grow-1 w-100 d-flex justify-content-start" htmlFor={key}>
                <TransactionsFilterMenuOption fieldKey={fieldKey} optionKey={optionKeys[option]}></TransactionsFilterMenuOption>
              </label>
            </div>
          );
        }
      })}

      {undefinedOptionsSet.size > 0 && (
        <div className="form-check" key={checkUndefinedOptionsInputId}>
          <input
            type="checkbox"
            checked={undefinedChecked}
            onChange={optionChangeHandler(undefinedOptionsSet)}
            id={checkUndefinedOptionsInputId}
            disabled={optionsInputDisabled}
            className="form-check-input"
          />
          <label
            className="form-check-label flex-grow-1 w-100 d-flex justify-content-start"
            htmlFor={checkUndefinedOptionsInputId}
          >
            <TransactionsFilterMenuOption
              fieldKey={fieldKey}
              optionKey={optionKeys[undefinedOptionsSet.values().next().value as TransactionType[T]]}
            ></TransactionsFilterMenuOption>
          </label>
        </div>
      )}
    </>
  );
};
