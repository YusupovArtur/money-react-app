import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionFieldCaptionKeyType.ts';
import { ChangeEvent, useId } from 'react';
import { TransactionsFilterMenuOptionLabel } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/components/TransactionsFilterMenuOptionLabel.tsx';

interface TransactionsFilterMenuOptionProps<T extends keyof TransactionType> {
  fieldKey: T;
  // option: TransactionType[T];
  optionKey: TransactionFieldCaptionKeyType<T>;
  checked: boolean;
  // filter: TransactionFilterRuleType<T> | null;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TransactionsFilterMenuOption = <T extends keyof TransactionType>({
  fieldKey,
  // option,
  optionKey,
  checked,
  disabled,
  onChange,
}: TransactionsFilterMenuOptionProps<T>) => {
  // const checked = !filter || isRangeFilter(filter) || (isSet(filter) && !(filter as Set<any>).has(option));
  const id = useId();
  return (
    <div className="form-check">
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} id={id} className="form-check-input" />
      <label className="form-check-label flex-grow-1 w-100 d-flex justify-content-start" htmlFor={id}>
        <TransactionsFilterMenuOptionLabel fieldKey={fieldKey} optionKey={optionKey} />
      </label>
    </div>
  );
};
