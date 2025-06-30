import { ChangeEvent, ReactNode, useId } from 'react';
// Components
import { TransactionsFilterMenuOption } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TransactionsFilterMenuOption.tsx';
import { ButtonWithIcon } from 'shared/ui';
// UI
import { FilterEmptyIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/FilterEmptyIcon.tsx';
import { FilterFillIcon } from 'pages/TransactionsPage/widgets/TransactionsFilter/icons/FilterFillIcon.tsx';
// Types
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterDispatcherType } from 'pages/TransactionsPage/widgets/TransactionsFilter/hooks/useSetFilter.ts';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionsFilterType.ts';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType';

interface TableFilterOptionsMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
  filter: TransactionsFilterType<keyof TransactionType>;
  setFilter: FilterDispatcherType<T>;
}

export const TableFilterOptionsMenu = <T extends keyof TransactionType>({
  fieldKey,
  options,
  optionKeys,
  filter,
  setFilter,
}: TableFilterOptionsMenuProps<T>): ReactNode => {
  const currentFilter: TransactionsFilterType<keyof TransactionType> =
    filter.key === fieldKey
      ? filter
      : {
          key: fieldKey,
          filter: null,
        };

  const allChecked =
    currentFilter.filter === null ? true : currentFilter.filter instanceof Set ? currentFilter.filter.size === 0 : true;

  const checkAllHtmlForId = useId();

  // const deleteFilterHandler = (): void => {
  //   setFilter({ key: 'type', filter: null });
  // };
  //
  // const clearFilterHandler = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setFilter((state): TransactionsFilterType<T> => {
  //     if (state.key === fieldKey) {
  //       if (event.target.checked) {
  //         return { key: fieldKey, filter: null as any };
  //       } else {
  //         return { key: fieldKey, filter: new Set(options) as any };
  //       }
  //     } else {
  //       return { key: fieldKey, filter: new Set(options) as any };
  //     }
  //   });
  // };
  //
  // const handlerOptionChange = (option: TransactionType[T]) => (event: ChangeEvent<HTMLInputElement>) => {
  //   const checked = event.target.checked;
  //
  //   setFilter((state): TransactionsFilterType<T> => {
  //     if (state.key !== fieldKey || !(state.filter instanceof Set)) {
  //       if (!checked) {
  //         return { key: fieldKey, filter: new Set<TransactionType[T]>([option]) as any };
  //       } else {
  //         return { key: fieldKey, filter: null as any };
  //       }
  //     }
  //
  //     console.log(state);
  //     const newSet = new Set<TransactionType[T]>(state.filter as Set<TransactionType[T]>);
  //     if (checked) {
  //       newSet.delete(option);
  //     } else {
  //       newSet.add(option);
  //     }
  //
  //     return { key: fieldKey, filter: newSet as any };
  //   });
  // };

  const deleteFilterHandler = () => {
    setFilter({ type: 'delete' });
  };

  const clearFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilter({ type: 'setAll' });
    } else {
      setFilter({ type: 'setNone', options: options });
    }
  };

  const optionChangeHandler = (option: TransactionType[T]) => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilter({ type: 'add', option: option });
    } else {
      setFilter({ type: 'remove', option: option });
    }
  };

  return (
    <>
      <ButtonWithIcon className="btn btn-body mt-3 mb-1" caption="Удалить фильтр" onClick={deleteFilterHandler}>
        {currentFilter.filter !== null ? <FilterFillIcon iconSize="1rem" /> : <FilterEmptyIcon iconSize="1rem" />}
      </ButtonWithIcon>

      <div className="form-check mb-1">
        <input
          className="form-check-input"
          type="checkbox"
          checked={allChecked}
          onChange={clearFilterHandler}
          id={checkAllHtmlForId}
        />
        <label className="form-check-label flex-grow-1 w-100 fw-bold" htmlFor={checkAllHtmlForId}>
          Выбрать все
        </label>
      </div>

      {options.map((option, index) => {
        const key = option.toString() + index.toString();

        const checked =
          currentFilter.filter === null
            ? true
            : currentFilter.filter instanceof Set
              ? !(currentFilter.filter as Set<any>).has(option)
              : true;

        return (
          <div className="form-check" key={key}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={checked}
              onChange={optionChangeHandler(option)}
              id={key}
            />
            <label className="form-check-label flex-grow-1 w-100" htmlFor={key}>
              <TransactionsFilterMenuOption fieldKey={fieldKey} optionKey={optionKeys[option]}></TransactionsFilterMenuOption>
            </label>
          </div>
        );
      })}
    </>
  );
};
