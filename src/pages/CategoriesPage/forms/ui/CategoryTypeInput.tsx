import { FC, useId } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { getCategoryTypeName } from 'pages/CategoriesPage/helpers/getCategoryTypeName.ts';

interface CategoryTypeInputProps {
  type: CategoryType['type'];
  setType: (type: CategoryType['type']) => void;
  id?: string;
}

export const CategoryTypeInput: FC<CategoryTypeInputProps> = ({ type, setType, id }) => {
  const optionID1 = useId();
  const optionID2 = useId();
  const optionID3 = useId();

  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <div className="btn-group" role="group">
        <input
          type="radio"
          onChange={() => setType('expense')}
          className="btn-check"
          name="btnradio"
          id={optionID1}
          autoComplete="off"
          checked={type === 'expense'}
        />
        <label className="btn btn-outline-danger" htmlFor={optionID1}>
          {getCategoryTypeName('expense')}
        </label>

        <input
          type="radio"
          onChange={() => setType('income')}
          className="btn-check"
          name="btnradio"
          id={optionID2}
          autoComplete="off"
          checked={type === 'income'}
        />
        <label className="btn btn-outline-success" htmlFor={optionID2}>
          {getCategoryTypeName('expense')}
        </label>

        <input
          type="radio"
          onChange={() => setType('transfer')}
          className="btn-check"
          name="btnradio"
          id={optionID3}
          autoComplete="off"
          checked={type === 'transfer'}
        />
        <label className="btn btn-outline-primary" htmlFor={optionID3}>
          {getCategoryTypeName('transfer')}
        </label>
      </div>
    </>
  );
};
