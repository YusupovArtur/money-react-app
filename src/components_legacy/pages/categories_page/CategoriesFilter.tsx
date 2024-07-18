import { FC } from 'react';

const CategoriesFilter: FC<{
  filter: 'all' | 'expense' | 'income' | 'transfer';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'expense' | 'income' | 'transfer'>>;
}> = ({ filter, setFilter }) => {
  return (
    <div className="btn-group mb-2" role="group">
      <input
        type="radio"
        onChange={() => setFilter('all')}
        checked={filter === 'all'}
        className="btn-check"
        name="category-filter"
        id="all"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="all">
        Все
      </label>

      <input
        type="radio"
        onChange={() => setFilter('expense')}
        checked={filter === 'expense'}
        className="btn-check"
        name="category-filter"
        id="expense"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="expense">
        Расходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('income')}
        checked={filter === 'income'}
        className="btn-check"
        name="category-filter"
        id="income"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="income">
        Доходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('transfer')}
        checked={filter === 'transfer'}
        className="btn-check"
        name="category-filter"
        id="transfer"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="transfer">
        Переводы
      </label>
    </div>
  );
};

export default CategoriesFilter;
