import { Dispatch, FC, SetStateAction, useId } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { CategoryIcon, ValidityIcon } from 'shared/icons';
import { FormLabel } from 'shared/ui';
import { CategoryIDInput } from 'pages/TransactionsPage/inputs/CategoryIDInput.tsx';
import { SubcategoryIDInput } from 'pages/TransactionsPage/inputs/SubcategoryIDInput.tsx';
import { OptionalPrimitiveKeysType } from 'shared/types';

interface CategoryAndSubcategoryIDFormProps {
  formData: TransactionType;
  setFormData: Dispatch<SetStateAction<TransactionType>>;
  isValidCategory?: boolean;
  isValidSubcategory?: boolean;
  setIsValidate: Dispatch<SetStateAction<OptionalPrimitiveKeysType<TransactionType, boolean>>>;
}

export const CategoryAndSubcategoryIDForm: FC<CategoryAndSubcategoryIDFormProps> = ({
  formData,
  setFormData,
  isValidCategory,
  isValidSubcategory,
  setIsValidate,
}) => {
  const categoryInputID = useId();
  const subcategoryInputID = useId();

  const setCategoryID = (id: string) => {
    setFormData((state) => {
      if (id === state.category) {
        return state;
      }
      return { ...state, category: id, subcategory: '' };
    });
  };
  const setSubcategoryID = (id: string) => {
    setFormData((state) => {
      if (id === state.subcategory) {
        return state;
      }
      return { ...state, subcategory: id };
    });
  };

  const categorySetValidate = () => {
    setIsValidate((state) => ({ ...state, category: true, subcategory: true }));
  };
  const subcategorySetValidate = () => {
    setIsValidate((state) => ({ ...state, subcategory: true }));
  };

  return (
    <div className="d-flex">
      <div className="w-50">
        <div className="d-flex align-items-center mx-1">
          <CategoryIcon iconSize="1rem" />
          <FormLabel className="ms-1" htmlFor={categoryInputID}>
            Категория
          </FormLabel>
          {!(!formData.category && formData.type === 'transfer') && <ValidityIcon isValid={isValidCategory} iconSize="1.4rem" />}
        </div>
        <CategoryIDInput
          inputID={categoryInputID}
          categoryID={formData.category}
          setCategoryID={setCategoryID}
          categoryType={formData.type}
          setValidate={categorySetValidate}
        />
      </div>
      <div className="w-50">
        <div className="d-flex align-items-center mx-1">
          <FormLabel htmlFor={subcategoryInputID}>Подкатегория</FormLabel>
          {formData.subcategory && <ValidityIcon isValid={isValidSubcategory} iconSize="1.4rem" />}
        </div>
        <SubcategoryIDInput
          inputID={subcategoryInputID}
          categoryID={formData.category}
          subcategoryID={formData.subcategory}
          setSubcategoryID={setSubcategoryID}
          setValidate={subcategorySetValidate}
        />
      </div>
    </div>
  );
};
