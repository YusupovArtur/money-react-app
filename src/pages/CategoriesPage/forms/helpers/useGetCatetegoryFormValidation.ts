import { Dispatch, SetStateAction, useState } from 'react';
import { CategoryAddType } from 'store/slices/categoriesSlice';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'entities/EntitiesComponents';

export const useGetCategoryFormValidation = (
  formData: CategoryAddType,
): {
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof CategoryAddType]?: boolean }>>;
  validation: ReturnType<typeof useFormValidation<CategoryAddType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<{ [K in keyof CategoryAddType]?: boolean }>({
    name: Boolean(formData.name),
    type: true,
  });

  const validation = useFormValidation<CategoryAddType>({
    formData,
    validators: {
      name: nameValidator,
      type: typeValidator,
    },
    isValidate,
  });
  const setValidateFields = () => {
    setIsValidate({ name: true, type: true });
  };

  return { setIsValidate, validation, setValidateFields };
};
