import { ChangeEvent, ReactNode, useEffect, useId, useState } from 'react';
// Components
import { DateInput, NumberInput } from 'shared/inputs';
import { TransactionsFilterMenuOption } from './TransactionsFilterMenuOption.tsx';
import { ButtonWithIcon, EntityFieldLabel } from 'shared/ui';
// Helpers
import { isSubset } from 'shared/helpers';
import { getCurrentFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getCurrentFilter.ts';
import { getUndefinedFilterOptionsSet } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getUndefinedFilterOptionsSet.ts';
import { isRangeFilterObject } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/isRangeFilterObject.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getRangeFilterFromFilter.ts';
// UI
import { FilterIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterIcon.tsx';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter.ts';
import {
  RangeFilterType,
  TransactionsFilterType,
} from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';

interface TransactionsTableFilteringMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: FilterDispatcherType<T>;
  portalContainerForInternalDropdowns?: HTMLElement | null;
}

export const TransactionsTableFilteringMenu = <T extends keyof TransactionType>({
  fieldKey,
  options,
  optionKeys,
  filter,
  setFilter,
  portalContainerForInternalDropdowns,
}: TransactionsTableFilteringMenuProps<T>): ReactNode => {
  const currentFilter = getCurrentFilter({ fieldKey: fieldKey, filter: filter });

  const allChecked = currentFilter.filter === null || (currentFilter.filter instanceof Set && currentFilter.filter.size === 0);
  const rangeInputDisabled = currentFilter.filter instanceof Set && currentFilter.filter.size > 0;
  const optionsInputDisabled =
    isRangeFilterObject(currentFilter.filter) && (!isNaN(currentFilter.filter.min) || !isNaN(currentFilter.filter.max));

  // Undefined options logics
  const undefinedOptionsSet = getUndefinedFilterOptionsSet({ fieldKey, options, optionKeys });
  const undefinedChecked =
    currentFilter.filter === null ||
    (currentFilter.filter instanceof Set && !isSubset(currentFilter.filter, undefinedOptionsSet));

  // Menu handlers
  const deleteFilterHandler = () => {
    setFilter({ type: 'delete' });
  };
  const clearFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilter({ type: 'delete' });
    } else {
      setFilter({ type: 'setNone', options: options });
    }
  };
  const optionChangeHandler =
    (option: TransactionType[T] | Set<TransactionType[T]>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFilter({ type: 'add', option: option });
      } else {
        setFilter({ type: 'remove', option: option });
      }
    };

  // Range filter logics
  const [rangeFilter, setRangeFilter] = useState<RangeFilterType>(getRangeFilterFromFilter({ fieldKey, filter }));
  const setRangeFilterHandler = (field: 'min' | 'max') => (value: number) => {
    setRangeFilter((state) => ({ ...state, [field]: value }));
  };
  useEffect(() => {
    if (!isNaN(rangeFilter.min) || !isNaN(rangeFilter.max)) {
      setFilter({ type: 'range', option: rangeFilter });
    } else {
      if (isRangeFilterObject(currentFilter.filter)) {
        setFilter({ type: 'delete' });
      }
    }
  }, [rangeFilter.min, rangeFilter.max]);
  useEffect(() => {
    const currentFilter = getCurrentFilter({ fieldKey, filter });
    if (currentFilter.filter === null || currentFilter.filter instanceof Set) {
      setRangeFilter({ min: NaN, max: NaN });
    }
  }, [filter]);

  const rangeInputId1 = useId();
  const rangeInputId2 = useId();
  const checkAllInputId = useId();
  const checkUndefinedOptionsInputId = useId();
  return (
    <>
      <ButtonWithIcon className="btn btn-body mt-3 mb-1" caption="Удалить фильтр" onClick={deleteFilterHandler}>
        <FilterIcon fieldKey={fieldKey} filter={filter} iconSize="1rem" isIconForDeleteFilterButton={true} />
      </ButtonWithIcon>

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
          const checked =
            currentFilter.filter === null
              ? true
              : currentFilter.filter instanceof Set
                ? !(currentFilter.filter as Set<any>).has(option)
                : true;

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
              <label className="form-check-label flex-grow-1 w-100" htmlFor={key}>
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
          <label className="form-check-label flex-grow-1 w-100" htmlFor={checkUndefinedOptionsInputId}>
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
