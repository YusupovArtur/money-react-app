import { ReactNode } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { TransactionFieldCaptionKeyType } from 'pages/TransactionsPage/widgets/TransactionsFilter/types/TransactionFieldCaptionKeyType';
import { TransactionsFilterMenuOption } from 'pages/TransactionsPage/widgets/TransactionsFilter/components/TransactionsFilterMenuOption.tsx';

interface TableFilterOptionsMenuProps<T extends keyof TransactionType> {
  fieldKey: T;
  options: TransactionType[T][];
  optionKeys: Record<TransactionType[T], TransactionFieldCaptionKeyType<T>>;
}

export const TableFilterOptionsMenu = <T extends keyof TransactionType>({
  fieldKey,
  options,
  optionKeys,
}: TableFilterOptionsMenuProps<T>): ReactNode => {
  return (
    <div>
      {options.map((option, index) => {
        const key = option.toString() + index.toString();

        return (
          <div className="form-check" key={key}>
            <input className="form-check-input" type="checkbox" defaultChecked={true} id={key} />
            <label className="form-check-label" htmlFor={key}>
              <TransactionsFilterMenuOption fieldKey={fieldKey} optionKey={optionKeys[option]}></TransactionsFilterMenuOption>
            </label>
          </div>
        );
      })}
    </div>
  );
};
