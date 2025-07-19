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
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getCurrentFilter.ts';
import { TrashFillIcon } from 'shared/icons';
import { RangeType } from 'shared/types';

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
  const [minRange, setMinRange] = useState<number>(getRangeFilterFromFilter({ fieldKey, filter }).min);
  const [maxRange, setMaxRange] = useState<number>(getRangeFilterFromFilter({ fieldKey, filter }).max);
  const [timestampRange, setTimestampRange] = useState<RangeType<number>>({ 1: NaN, 2: NaN });

  // timestampRange effects
  useEffect(() => {
    if (!isNaN(timestampRange[1]) || !isNaN(timestampRange[1])) {
      filterDispatch({ type: 'range', payload: { min: timestampRange[1], max: timestampRange[2] } });
    }
  }, [timestampRange]);
  useEffect(() => {
    const currentFilter = getCurrentFilter({ fieldKey, filters: filter });
    if (currentFilter.filter === null || currentFilter.filter instanceof Set) {
      setTimestampRange({ 1: NaN, 2: NaN });
    }
    if (isRangeFilterObject(filter.filter)) {
      if (!deepEqual(filter.filter, { min: timestampRange[1], max: timestampRange[2] })) {
        setTimestampRange({ 1: filter.filter.min, 2: filter.filter.max });
      }
    }
  }, [filter]);

  // minRange maxRange effects
  useEffect(() => {
    if (!isNaN(maxRange) || !isNaN(minRange)) {
      console.log(minRange, maxRange);
      filterDispatch({ type: 'range', payload: { min: minRange, max: maxRange } });
    } else {
      if (isRangeFilterObject(filter.filter)) {
        filterDispatch({ type: 'setAll' });
      }
    }
  }, [minRange, maxRange]);
  useEffect(() => {
    const currentFilter = getCurrentFilter({ fieldKey, filters: filter });
    if (currentFilter.filter === null || currentFilter.filter instanceof Set) {
      setMinRange(NaN);
      setMaxRange(NaN);
    }
    if (isRangeFilterObject(filter.filter)) {
      if (!deepEqual(filter.filter, { min: minRange, max: maxRange })) {
        setMinRange(filter.filter.min);
        setMaxRange(filter.filter.max);
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
          <EntityFieldLabel className="align-self-start mx-1">Период</EntityFieldLabel>
          <DateInput
            timestampRange={timestampRange}
            setTimestampRange={setTimestampRange}
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
            number={maxRange}
            setNumber={setMaxRange}
            isCanSetNaN={true}
            disabled={rangeInputDisabled}
            style={{ fontSize: '0.9rem' }}
          />
          <EntityFieldLabel className="align-self-start mx-1">От</EntityFieldLabel>
          <NumberInput
            id={rangeInputId2}
            number={minRange}
            setNumber={setMinRange}
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
