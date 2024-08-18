import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';

interface TransactionTypeToggleProps {
  type: TransactionType['type'];
  setType: (type: TransactionType['type']) => void;
  onClear: (type: TransactionType['type']) => void;
}

export const TransactionTypeToggle: FC<TransactionTypeToggleProps> = ({ type, setType, onClear }) => {
  return (
    <div className="d-flex mt-3">
      <input
        type="radio"
        onChange={() => {
          setType('expense');
          onClear('expense');
        }}
        checked={type === 'expense'}
        className="btn-check"
        id="expense"
        autoComplete="off"
      />
      <label className="btn btn-outline-danger rounded-0 rounded-start" htmlFor="expense">
        Расход
      </label>

      <input
        type="radio"
        onChange={() => {
          setType('income');
          onClear('income');
        }}
        checked={type === 'income'}
        className="btn-check"
        id="income"
        autoComplete="off"
      />
      <label className="btn btn-outline-success rounded-0" htmlFor="income">
        Доход
      </label>

      <input
        type="radio"
        onChange={() => {
          setType('transfer');
          onClear('transfer');
        }}
        checked={type === 'transfer'}
        className="btn-check"
        id="transfer"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary rounded-0 rounded-end" htmlFor="transfer">
        Перевод
      </label>
    </div>
  );
};
