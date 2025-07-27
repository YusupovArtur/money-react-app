import { FC, useEffect, useId, useState } from 'react';
// Components
import { NumberInput } from 'shared/inputs';
import { EntityFieldLabel } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { deepEqual, isSet } from 'shared/helpers';
import { isRangeFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/isRangeFilter.ts';
import { getRangeFilterFromFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getRangeFilterFromFilter.ts';
// Types
import { SetStateCallbackType } from 'shared/types';

interface FilteringSumInputProps {
  fieldKey: 'sum';
}

export const FilteringSumInput: FC<FilteringSumInputProps> = ({ fieldKey }) => {
  const { setFilters, currentFilters } = useTransactionsFilteringContext();
  const filterDispatch = useFilterDispatch({ fieldKey: fieldKey, setFilters: setFilters });

  const filter = currentFilters[fieldKey] !== undefined ? currentFilters[fieldKey].filter : null;
  const currentFilter = currentFilters[fieldKey] || { key: fieldKey, filter: filter as any };
  const rangeFilter = getRangeFilterFromFilter({ fieldKey, filter: currentFilter });

  const [minRange, setMinRange] = useState<number>(rangeFilter.min);
  const [maxRange, setMaxRange] = useState<number>(rangeFilter.max);

  useEffect(() => {
    const rangeFilter = getRangeFilterFromFilter({ fieldKey: fieldKey, filter: currentFilter });
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

  const rangeInputDisabled = filter !== null && isSet(filter) && filter.size > 0;
  const rangeInputId1 = useId();
  const rangeInputId2 = useId();

  return (
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
  );
};
