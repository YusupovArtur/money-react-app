import { FC, useEffect, useState } from 'react';
// Hooks
import { useFilterDispatch } from 'widgets/TransactionsSortingFilteringMenu/hooks/useSetFilter/useFilterDispatch.ts';
import { useTransactionsFilteringContext } from 'widgets/TransactionsSortingFilteringMenu/hooks/useTransactionsFilteringContext.ts';
// Components
import { DropdownContainer } from 'shared/containers';
import { SortingFilteringToggle } from 'widgets/TransactionsSortingFilteringMenu/components/SortingFilteringToggle.tsx';
import { DateInputPicker } from 'shared/inputs/DateInput/inputs/DateInputPicker/DateInputPicker.tsx';
// Helpers
import { deepEqual, getDeviceType } from 'shared/helpers';
import { getRangeFilterFromFilter } from 'widgets/TransactionsSortingFilteringMenu/helpers/small_helpers/getRangeFilterFromFilter.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';
import { getDateStateRangeFromTimestampRange } from 'shared/inputs/DateInput/helpers/getDateStateFromTimestamp.ts';
// UI
import { FilterIcon } from 'widgets/TransactionsSortingFilteringMenu/icons/FilterIcon.tsx';
import { TrashFillIcon } from 'shared/icons';
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
// Types
import { DateStateRangeType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { SetStateCallbackType } from 'shared/types';

export const DatePickerTimeFilteringMenu: FC = () => {
  const { filters, setFilters, currentFilters } = useTransactionsFilteringContext();

  const timeFilter = currentFilters['time'] || { key: 'time', filter: null };
  const timeRangeFilter = getRangeFilterFromFilter({ fieldKey: 'time', filter: timeFilter });
  const timeFilterDispatch = useFilterDispatch({ fieldKey: 'time', setFilters: setFilters });

  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState(false);
  const [dateStateRange, setDateStateRange] = useState<DateStateRangeType>(
    getDateStateRangeFromTimestampRange({
      1: timeRangeFilter.min,
      2: timeRangeFilter.max,
    }),
  );

  const setDateStateRangeWithCallback: SetStateCallbackType<DateStateRangeType> = (updater) => {
    if (typeof updater === 'function') {
      setDateStateRange((state) => {
        const newState = updater(state);
        if (state !== newState) {
          timeFilterDispatch({
            type: 'setRange',
            payload: { min: getTimestampFromDateState(newState[1]), max: getTimestampFromDateState(newState[2]) },
          });
        }
        return newState;
      });
    } else {
      setDateStateRange(updater);
      timeFilterDispatch({
        type: 'setRange',
        payload: { min: getTimestampFromDateState(updater[1]), max: getTimestampFromDateState(updater[2]) },
      });
    }
  };
  useEffect(() => {
    const dateStateRangeFromFilter = getDateStateRangeFromTimestampRange({ 1: timeRangeFilter.min, 2: timeRangeFilter.max });
    if (!deepEqual(dateStateRangeFromFilter, dateStateRange)) {
      setDateStateRange(dateStateRangeFromFilter);
    }
  }, [timeRangeFilter]);

  const isModal = getDeviceType() === 'mobile';

  const deleteFilterHandler = () => {
    timeFilterDispatch({ type: 'delete' });
  };
  const deleteAllFiltersHandler = () => {
    if (filters.length > 1) timeFilterDispatch({ type: 'deleteAll' });
  };

  return (
    <DropdownContainer
      isInsideClickClose={false}
      toggleDivStyleProps={{ style: { width: '100%', height: '100%' } }}
      isOpened={isOpenedDatePicker}
      setIsOpened={setIsOpenedDatePicker}
      isModalDropdownContainerForMobileDevice={true}
      DropdownToggle={<SortingFilteringToggle fieldKey={'time'} />}
      DropdownMenu={
        <DropdownMenuWrapper>
          <div className="d-flex mb-3">
            <ButtonWithIcon className="flex-grow-1 btn btn-body me-1" caption="Удалить фильтр" onClick={deleteFilterHandler}>
              <FilterIcon filter={timeFilter} iconSize="1rem" isIconForDeleteFilterButton={true} />
            </ButtonWithIcon>
            <ButtonWithIcon onClick={deleteAllFiltersHandler} className={`btn btn-body ${filters.length > 1 && 'text-danger'}`}>
              <TrashFillIcon iconSize="1rem" />
            </ButtonWithIcon>
          </div>

          <DateInputPicker
            dateStateRange={dateStateRange}
            setDateStateRange={setDateStateRangeWithCallback}
            setIsOpenedDatepicker={setIsOpenedDatePicker}
            isModal={isModal}
          />
        </DropdownMenuWrapper>
      }
    />
  );
};
