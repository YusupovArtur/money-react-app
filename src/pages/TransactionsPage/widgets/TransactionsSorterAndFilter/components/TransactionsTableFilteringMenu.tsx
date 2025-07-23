import { ChangeEvent, ReactNode, useEffect, useId, useState } from 'react';
// Components
import { DateInput, NumberInput } from 'shared/inputs';
import { TransactionsFilterMenuOption } from './TransactionsFilterMenuOption.tsx';
import { ButtonWithIcon, EntityFieldLabel } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { deepEqual, isSet, isSubset } from 'shared/helpers';
import { getUndefinedFilterOptionsSet } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getUndefinedFilterOptionsSet.ts';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/isRangeFilterObject.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getRangeFilterFromFilter.ts';
import { getTransactionsFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getTransactionsFilterOptionsList.ts';
// UI
import { FilterIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterIcon.tsx';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { TrashFillIcon } from 'shared/icons';
import { RangeType, SetStateCallbackType } from 'shared/types';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';

interface TransactionsTableFilteringMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  portalContainerForInternalDropdowns?: HTMLElement | null;
}

export const TransactionsTableFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  portalContainerForInternalDropdowns,
}: TransactionsTableFilteringMenuProps<T>): ReactNode => {
  const { currentFilters, filters, setFilters, ordersForFilterOptions, transactions } = useTransactionsFilteringContext();

  const { options, optionKeys } = getTransactionsFilterOptionsList({
    fieldKey: fieldKey,
    order: ordersForFilterOptions[fieldKey],
    list: transactions,
  });

  const filterDispatch = useFilterDispatch({ fieldKey: fieldKey, setFilters: setFilters });
  const filter = currentFilters[fieldKey] !== undefined ? currentFilters[fieldKey].filter : null;
  const currentFilter: TransactionsFilterType<T> = currentFilters[fieldKey] || { key: fieldKey, filter: null as any };

  const allChecked =
    filter === null ||
    (isSet(filter) && filter.size === 0) ||
    (isRangeFilterObject(filter) && isNaN(filter.min) && isNaN(filter.max));
  const rangeInputDisabled = filter !== null && isSet(filter) && filter.size > 0;
  const optionsInputDisabled = filter !== null && isRangeFilterObject(filter) && (!isNaN(filter.min) || !isNaN(filter.max));

  // Undefined options logics
  const undefinedOptionsSet = getUndefinedFilterOptionsSet({ fieldKey, options, optionKeys });
  const undefinedChecked = filter === null || (isSet(filter) && !isSubset(filter, undefinedOptionsSet));

  // Menu handlers
  const deleteFilterHandler = () => {
    filterDispatch({ type: 'delete' });
  };
  const deleteAllFiltersHandler = () => {
    if (filters.length > 1) filterDispatch({ type: 'deleteAll' });
  };
  const clearFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      filterDispatch({ type: 'setAll' });
    } else {
      filterDispatch({ type: 'remove', payload: options });
    }
  };
  const optionChangeHandler =
    (option: TransactionType[T] | TransactionType[T][] | Set<TransactionType[T]>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        filterDispatch({ type: 'add', payload: option });
      } else {
        filterDispatch({ type: 'remove', payload: option });
      }
    };

  // Range filter logics
  const [minRange, setMinRange] = useState<number>(getRangeFilterFromFilter({ fieldKey, filter: currentFilter }).min);
  const [maxRange, setMaxRange] = useState<number>(getRangeFilterFromFilter({ fieldKey, filter: currentFilter }).max);
  const [timestampRange, setTimestampRange] = useState<RangeType<number>>({ 1: NaN, 2: NaN });

  useEffect(() => {
    const rangeFilter = getRangeFilterFromFilter({ fieldKey: fieldKey, filter: currentFilter });
    if (!deepEqual(rangeFilter, { min: timestampRange[1], max: timestampRange[2] })) {
      if (filter === null || isSet(filter)) {
        setTimestampRange({ 1: NaN, 2: NaN });
      }
      if (isRangeFilterObject(filter)) {
        setTimestampRange({ 1: filter.min, 2: filter.max });
      }
    }
    if (!deepEqual(rangeFilter, { min: maxRange, max: maxRange })) {
      if (filter === null || isSet(filter)) {
        setMinRange(NaN);
        setMaxRange(NaN);
      }
      if (isRangeFilterObject(filter)) {
        setMinRange(filter.min);
        setMaxRange(filter.max);
      }
    }
  }, [filter]);

  const setTimestampRangeWithCallback: SetStateCallbackType<RangeType<number>> = (updater) => {
    if (typeof updater === 'function') {
      setTimestampRange((state) => {
        const newState = updater(state);
        if (!isNaN(newState[1]) || !isNaN(newState[2])) {
          filterDispatch({ type: 'setRange', payload: { min: newState[1], max: newState[2] } });
        } else {
          filterDispatch({ type: 'setRange', payload: { min: NaN, max: NaN } });
        }
        return newState;
      });
    } else {
      setTimestampRange(updater);
      if (!isNaN(updater[1]) || !isNaN(updater[2])) {
        filterDispatch({ type: 'setRange', payload: { min: updater[1], max: updater[2] } });
      } else {
        filterDispatch({ type: 'setRange', payload: { min: NaN, max: NaN } });
      }
    }
  };
  const setMinRangeWithCallback: SetStateCallbackType<number> = (updater) => {
    if (typeof updater === 'function') {
      setMinRange((state) => {
        const newState = updater(state);
        filterDispatch({ type: 'setRange', payload: { min: newState } });
        return newState;
      });
    } else {
      setMinRange(updater);
      filterDispatch({ type: 'setRange', payload: { min: updater } });
    }
  };
  const setMaxRangeWithCallback: SetStateCallbackType<number> = (updater) => {
    if (typeof updater === 'function') {
      setMaxRange((state) => {
        const newState = updater(state);
        filterDispatch({ type: 'setRange', payload: { max: newState } });
        return newState;
      });
    } else {
      setMaxRange(updater);
      filterDispatch({ type: 'setRange', payload: { max: updater } });
    }
  };

  const rangeInputId1 = useId();
  const rangeInputId2 = useId();
  const checkAllInputId = useId();
  const checkUndefinedOptionsInputId = useId();
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
        <>
          <EntityFieldLabel className="align-self-start mx-1">Период</EntityFieldLabel>
          <DateInput
            timestampRange={timestampRange}
            setTimestampRange={setTimestampRangeWithCallback}
            isModalDropdownContainerForMobileDevice={true}
            disabled={rangeInputDisabled}
            dateTextInputProps={{ id: rangeInputId2, style: { fontSize: '1rem' } }}
            dateInputsDivContainersProps={{ className: 'mb-2' }}
            portalContainerForDropdownContainer={portalContainerForInternalDropdowns}
            dropdownContainerZIndex={3}
          />
        </>
      )}

      {fieldKey === 'sum' && (
        <>
          <EntityFieldLabel className="align-self-start mx-1">До</EntityFieldLabel>
          <NumberInput
            id={rangeInputId1}
            number={maxRange}
            setNumber={setMaxRangeWithCallback}
            isCanSetNaN={true}
            disabled={rangeInputDisabled}
            style={{ fontSize: '0.9rem' }}
          />
          <EntityFieldLabel className="align-self-start mx-1">От</EntityFieldLabel>
          <NumberInput
            id={rangeInputId2}
            number={minRange}
            setNumber={setMinRangeWithCallback}
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
          const checked = filter === null ? true : isSet(filter) ? !(filter as Set<any>).has(option) : true;

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
            />
          </label>
        </div>
      )}
    </>
  );
};
