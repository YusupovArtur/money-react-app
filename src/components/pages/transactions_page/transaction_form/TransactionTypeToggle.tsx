import React from 'react';

const TransactionTypeToggle: React.FC<{
  type: 'expense' | 'income' | 'transfer';
  setType: (type: 'expense' | 'income' | 'transfer') => void;
}> = ({ type, setType }) => {
  return (
    <div className="d-flex mt-3">
      <input
        type="radio"
        onChange={() => setType('expense')}
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
        onChange={() => setType('income')}
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
        onChange={() => setType('transfer')}
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

export default TransactionTypeToggle;
