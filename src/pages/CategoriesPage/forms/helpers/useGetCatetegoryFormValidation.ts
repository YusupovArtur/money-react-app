import { Dispatch, SetStateAction, useState } from 'react';
import { CategoryAddType } from 'store/slices/categoriesSlice';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'entities/EntitiesComponents';
import { OptionalPrimitiveKeysType } from 'shared/types';

export const useGetCategoryFormValidation = (
  formData: CategoryAddType,
): {
  setIsValidate: Dispatch<SetStateAction<OptionalPrimitiveKeysType<CategoryAddType, boolean>>>;
  validation: ReturnType<typeof useFormValidation<CategoryAddType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<OptionalPrimitiveKeysType<CategoryAddType, boolean>>({
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
