import { Dispatch, FC, SetStateAction, useId } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';

export const CategoriesFilter: FC<{
  filter: CategoryType['type'] | null;
  setFilter: Dispatch<SetStateAction<CategoryType['type'] | null>>;
}> = ({ filter, setFilter }) => {
  const optionID1 = useId();
  const optionID2 = useId();
  const optionID3 = useId();
  const optionID4 = useId();

  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        onChange={() => setFilter(null)}
        className="btn-check"
        name="btnradio"
        id={optionID1}
        autoComplete="off"
        checked={filter === null}
      />
      <label className="btn btn-outline-primary" htmlFor={optionID1}>
        Все
      </label>

      <input
        type="radio"
        onChange={() => setFilter('expense')}
        className="btn-check"
        name="btnradio"
        id={optionID2}
        autoComplete="off"
        checked={filter === 'expense'}
      />
      <label className="btn btn-outline-danger" htmlFor={optionID2}>
        Расходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('income')}
        className="btn-check"
        name="btnradio"
        id={optionID3}
        autoComplete="off"
        checked={filter === 'income'}
      />
      <label className="btn btn-outline-success" htmlFor={optionID3}>
        Доходы
      </label>

      <input
        type="radio"
        onChange={() => setFilter('transfer')}
        className="btn-check"
        name="btnradio"
        id={optionID4}
        autoComplete="off"
        checked={filter === 'transfer'}
      />
      <label className="btn btn-outline-primary" htmlFor={optionID4}>
        Переводы
      </label>
    </div>
  );
};
