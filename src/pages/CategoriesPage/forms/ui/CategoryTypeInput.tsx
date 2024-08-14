import { FC } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { getCategoryTypeName } from 'pages/CategoriesPage/helpers/getCategoryTypeName.ts';

interface CategoryTypeInputProps {
  type: CategoryType['type'];
  setType: (type: CategoryType['type']) => void;
  id?: string;
}

export const CategoryTypeInput: FC<CategoryTypeInputProps> = ({ type, setType, id }) => {
  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <div className="btn-group" role="group">
        <input
          type="radio"
          onChange={() => setType('expense')}
          className="btn-check"
          name="btnradio"
          id="typeOption1"
          autoComplete="off"
          checked={type === 'expense'}
        />
        <label className="btn btn-outline-danger" htmlFor="typeOption1">
          {getCategoryTypeName('expense')}
        </label>

        <input
          type="radio"
          onChange={() => setType('income')}
          className="btn-check"
          name="btnradio"
          id="typeOption2"
          autoComplete="off"
          checked={type === 'income'}
        />
        <label className="btn btn-outline-success" htmlFor="typeOption2">
          {getCategoryTypeName('expense')}
        </label>

        <input
          type="radio"
          onChange={() => setType('transfer')}
          className="btn-check"
          name="btnradio"
          id="typeOption3"
          autoComplete="off"
          checked={type === 'transfer'}
        />
        <label className="btn btn-outline-primary" htmlFor="typeOption3">
          {getCategoryTypeName('transfer')}
        </label>
      </div>
    </>
  );
};
