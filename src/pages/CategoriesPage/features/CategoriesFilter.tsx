import { Dispatch, FC, SetStateAction } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';

export const CategoriesFilter: FC<{
  filter: CategoryType['type'] | null;
  setFilter: Dispatch<SetStateAction<CategoryType['type'] | null>>;
}> = ({ filter, setFilter }) => {
  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        onChange={() => setFilter(null)}
        className="btn-check"
        name="btnradio"
        id="typeOption1"
        autoComplete="off"
        checked={filter === null}
      />
      <label className="btn btn-outline-primary" htmlFor="typeOption1">
        Все
      </label>

      <input
        type="radio"
        onChange={() => setFilter('expense')}
        className="btn-check"
        name="btnradio"
        id="typeOption2"
        autoComplete="off"
        checked={filter === 'expense'}
      />
      <label className="btn btn-outline-danger" htmlFor="typeOption2">
        Расходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('income')}
        className="btn-check"
        name="btnradio"
        id="typeOption3"
        autoComplete="off"
        checked={filter === 'income'}
      />
      <label className="btn btn-outline-success" htmlFor="typeOption3">
        Доходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('transfer')}
        className="btn-check"
        name="btnradio"
        id="typeOption4"
        autoComplete="off"
        checked={filter === 'transfer'}
      />
      <label className="btn btn-outline-primary" htmlFor="typeOption4">
        Переводы
      </label>
    </div>
  );
};
