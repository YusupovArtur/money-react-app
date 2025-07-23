import { ChangeEvent, ReactNode, useEffect, useId, useState } from 'react';
// Components
import { DateInput, NumberInput } from 'shared/inputs';
import { ButtonWithIcon, EntityFieldLabel } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { deepEqual, isSet, isSubset } from 'shared/helpers';
import { getUndefinedFilterOptionsSet } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getUndefinedFilterOptionsSet.ts';
import { isRangeFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/isRangeFilter.ts';
import { getRangeFilterFromFilter } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/small_helpers/getRangeFilterFromFilter.ts';
import { getTransactionsFilterOptionsList } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getTransactionsFilterOptionsList.ts';
// UI
import { FilterIcon } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/icons/FilterIcon.tsx';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { ExclamationIcon, TrashFillIcon } from 'shared/icons';
import { RangeType, SetStateCallbackType } from 'shared/types';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionsFilterMenuOption } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsFilterMenuOption.tsx';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';
import { TypeIcon } from 'entities/EntitiesComponents';

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
    filter === null || (isSet(filter) && filter.size === 0) || (isRangeFilter(filter) && isNaN(filter.min) && isNaN(filter.max));
  const rangeInputDisabled = filter !== null && isSet(filter) && filter.size > 0;
  const optionsInputDisabled = filter !== null && isRangeFilter(filter) && (!isNaN(filter.min) || !isNaN(filter.max));

  // Undefined options logics
  const undefinedOptionsSet = getUndefinedFilterOptionsSet({ fieldKey, options, optionKeys });
  const undefinedChecked = filter === null || (isSet(filter) && !isSubset(filter, undefinedOptionsSet));

  // For category and subcategory split by type
  const expenseCategoryTypeOptions: TransactionType[T][] = [];
  const incomeCategoryTypeOptions: TransactionType[T][] = [];
  const transferCategoryTypeOptions: TransactionType[T][] = [];
  if (fieldKey === 'category' || fieldKey === 'subcategory') {
    for (let option of options) {
      const optionKey = optionKeys[option];
      switch ((optionKey as TransactionFieldCaptionKeyType<'category' | 'subcategory'>).type) {
        case 'expense':
          expenseCategoryTypeOptions.push(option);
          break;
        case 'income':
          incomeCategoryTypeOptions.push(option);
          break;
        case 'transfer':
          transferCategoryTypeOptions.push(option);
      }
    }
  }

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
      if (isRangeFilter(filter)) {
        setTimestampRange({ 1: filter.min, 2: filter.max });
      }
    }
    if (!deepEqual(rangeFilter, { min: maxRange, max: maxRange })) {
      if (filter === null || isSet(filter)) {
        setMinRange(NaN);
        setMaxRange(NaN);
      }
      if (isRangeFilter(filter)) {
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

      {fieldKey !== 'category' && fieldKey !== 'subcategory' && (
        <>
          {options.map((option, index) => {
            if (!undefinedOptionsSet.has(option)) {
              return (
                <TransactionsFilterMenuOption
                  key={index.toString() + option.toString()}
                  fieldKey={fieldKey}
                  checked={!filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option))}
                  optionKey={optionKeys[option]}
                  disabled={optionsInputDisabled}
                  onChange={optionChangeHandler(option)}
                />
              );
            }
          })}
          {undefinedOptionsSet.size > 0 && (
            <TransactionsFilterMenuOption
              fieldKey={fieldKey}
              checked={undefinedChecked}
              optionKey={optionKeys[undefinedOptionsSet.values().next().value as TransactionType[T]]}
              disabled={optionsInputDisabled}
              onChange={optionChangeHandler(undefinedOptionsSet)}
            />
          )}
        </>
      )}

      {(fieldKey === 'category' || fieldKey === 'subcategory') && (
        <>
          {expenseCategoryTypeOptions.length > 0 && (
            <>
              <span className="d-flex align-items-center">
                <TypeIcon type="expense" iconSize="1rem" />
                <span className="ms-1">Расходы</span>
              </span>
              {expenseCategoryTypeOptions.map((option, index) => {
                if (!undefinedOptionsSet.has(option)) {
                  return (
                    <TransactionsFilterMenuOption
                      key={index.toString() + option.toString()}
                      fieldKey={fieldKey}
                      checked={!filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option))}
                      optionKey={optionKeys[option]}
                      disabled={optionsInputDisabled}
                      onChange={optionChangeHandler(option)}
                    />
                  );
                }
              })}
            </>
          )}
          {incomeCategoryTypeOptions.length > 0 && (
            <>
              <span className="d-flex align-items-center">
                <TypeIcon type="income" iconSize="1rem" />
                <span className="ms-1">Доходы</span>
              </span>
              {incomeCategoryTypeOptions.map((option, index) => {
                if (!undefinedOptionsSet.has(option)) {
                  return (
                    <TransactionsFilterMenuOption
                      key={index.toString() + option.toString()}
                      fieldKey={fieldKey}
                      checked={!filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option))}
                      optionKey={optionKeys[option]}
                      disabled={optionsInputDisabled}
                      onChange={optionChangeHandler(option)}
                    />
                  );
                }
              })}
            </>
          )}
          {transferCategoryTypeOptions.length > 0 && (
            <>
              <span className="d-flex align-items-center">
                <TypeIcon type="transfer" iconSize="1rem" />
                <span className="ms-1">Переводы</span>
              </span>
              {transferCategoryTypeOptions.map((option, index) => {
                if (!undefinedOptionsSet.has(option)) {
                  return (
                    <TransactionsFilterMenuOption
                      key={index.toString() + option.toString()}
                      fieldKey={fieldKey}
                      checked={!filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option))}
                      optionKey={optionKeys[option]}
                      disabled={optionsInputDisabled}
                      onChange={optionChangeHandler(option)}
                    />
                  );
                }
              })}
            </>
          )}
          {undefinedOptionsSet.size > 0 && (
            <>
              <span className="d-flex align-items-center">
                <ExclamationIcon iconSize="1rem" className="text-danger" />
                <span className="ms-1">Неизвестные</span>
              </span>
              <TransactionsFilterMenuOption
                fieldKey={fieldKey}
                checked={undefinedChecked}
                optionKey={optionKeys[undefinedOptionsSet.values().next().value as TransactionType[T]]}
                disabled={optionsInputDisabled}
                onChange={optionChangeHandler(undefinedOptionsSet)}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
