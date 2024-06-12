import React from 'react';
import { categoryAddType } from 'store/types';
import { getCategoryTypeName } from 'components/pages/categories_page/functions';

const CategoryTypeMenu: React.FC<{
  categoryType: 'expense' | 'income' | 'transfer';
  setType?: React.Dispatch<React.SetStateAction<'debit' | 'credit' | 'investment'>>;
  setFormData?: React.Dispatch<React.SetStateAction<categoryAddType>>;
}> = ({ categoryType, setType, setFormData }) => {
  return (
    <div className="dropdown">
      <button
        style={{ fontSize: '1.08rem' }}
        className="btn btn-body dropdown-toggle px-1 py-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {getCategoryTypeName(categoryType)}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            onClick={() => {
              if (setType) setType('debit');
              if (setFormData) setFormData((state) => ({ ...state, type: 'expense' }));
            }}
            className={`dropdown-item ${categoryType === 'expense' && 'active'}`}
          >
            {getCategoryTypeName('expense')}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (setType) setType('investment');
              if (setFormData) setFormData((state) => ({ ...state, type: 'income' }));
            }}
            className={`dropdown-item ${categoryType === 'income' && 'active'}`}
          >
            {getCategoryTypeName('income')}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (setType) setType('credit');
              if (setFormData) setFormData((state) => ({ ...state, type: 'transfer' }));
            }}
            className={`dropdown-item ${categoryType === 'transfer' && 'active'}`}
          >
            {getCategoryTypeName('transfer')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CategoryTypeMenu;
