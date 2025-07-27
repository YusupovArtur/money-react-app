import { FC, useEffect, useId, useState } from 'react';
// Components
import { DateInput } from 'shared/inputs';
import { EntityFieldLabel } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { deepEqual, isSet } from 'shared/helpers';
import { isRangeFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/isRangeFilter.ts';
import { getRangeFilterFromFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getRangeFilterFromFilter.ts';
// Types
import { RangeType, SetStateCallbackType } from 'shared/types';

interface FilteringDateInputProps {
  fieldKey: 'time';
  portalContainerForInternalDropdowns?: HTMLElement | null;
}

export const FilteringDateInput: FC<FilteringDateInputProps> = ({ fieldKey, portalContainerForInternalDropdowns }) => {
  const { setFilters, currentFilters } = useTransactionsFilteringContext();
  const filterDispatch = useFilterDispatch({ fieldKey: fieldKey, setFilters: setFilters });

  const filter = currentFilters[fieldKey] !== undefined ? currentFilters[fieldKey].filter : null;
  const currentFilter = currentFilters[fieldKey] || { key: fieldKey, filter: filter as any };
  const rangeFilter = getRangeFilterFromFilter({ fieldKey, filter: currentFilter });

  const [timestampRange, setTimestampRange] = useState<RangeType<number>>({ 1: rangeFilter.min, 2: rangeFilter.max });
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
  }, [filter]);

  const setTimestampRangeWithCallback: SetStateCallbackType<RangeType<number>> = (updater) => {
    if (typeof updater === 'function') {
      setTimestampRange((state) => {
        const newState = updater(state);
        if (state !== newState) {
          if (!isNaN(newState[1]) || !isNaN(newState[2])) {
            filterDispatch({ type: 'setRange', payload: { min: newState[1], max: newState[2] } });
          } else {
            filterDispatch({ type: 'setRange', payload: { min: NaN, max: NaN } });
          }
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

  const rangeInputDisabled = filter !== null && isSet(filter) && filter.size > 0;
  const dateTextInputId = useId();

  return (
    <>
      <EntityFieldLabel className="align-self-start mx-1">Период</EntityFieldLabel>
      <DateInput
        timestampRange={timestampRange}
        setTimestampRange={setTimestampRangeWithCallback}
        isModalDropdownContainerForMobileDevice={true}
        disabled={rangeInputDisabled}
        dateTextInputProps={{ id: dateTextInputId, style: { fontSize: '1rem' } }}
        dateInputsDivContainersProps={{ className: 'mb-2' }}
        portalContainerForDropdownContainer={portalContainerForInternalDropdowns}
        dropdownContainerZIndex={3}
      />
    </>
  );
};
