import { FC, useEffect, useId, useState } from 'react';
// Components
import { DateInput } from 'shared/inputs';
import { EntityFieldLabel } from 'shared/ui';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Helpers
import { deepEqual, isSet } from 'shared/helpers';
import { isRangeType } from 'shared/helpers';
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

  const [timestampRange, setTimestampRange] = useState<RangeType>(rangeFilter);
  useEffect(() => {
    const rangeFilter = getRangeFilterFromFilter({ fieldKey: fieldKey, filter: currentFilter });
    if (!deepEqual(rangeFilter, timestampRange)) {
      if (filter === null || isSet(filter)) {
        setTimestampRange({ 1: NaN, 2: NaN });
      }
      if (isRangeType(filter)) {
        setTimestampRange(filter);
      }
    }
  }, [filter]);

  const setTimestampRangeWithCallback: SetStateCallbackType<RangeType> = (updater) => {
    if (typeof updater === 'function') {
      setTimestampRange((state) => {
        const newState = updater(state);
        if (state !== newState) {
          if (!isNaN(newState[1]) || !isNaN(newState[2])) {
            filterDispatch({ type: 'setRange', payload: newState });
          } else {
            filterDispatch({ type: 'setRange', payload: { 1: NaN, 2: NaN } });
          }
        }
        return newState;
      });
    } else {
      setTimestampRange(updater);
      if (!isNaN(updater[1]) || !isNaN(updater[2])) {
        filterDispatch({ type: 'setRange', payload: updater });
      } else {
        filterDispatch({ type: 'setRange', payload: { 1: NaN, 2: NaN } });
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
