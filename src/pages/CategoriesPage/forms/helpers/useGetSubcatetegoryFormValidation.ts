import { Dispatch, SetStateAction, useState } from 'react';
import { SubcategoryType } from 'store/slices/categoriesSlice';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { OptionalPrimitiveKeysType } from 'shared/types';

export const useGetSubcategoryFormValidation = (
  formData: SubcategoryType,
): {
  setIsValidate: Dispatch<SetStateAction<OptionalPrimitiveKeysType<SubcategoryType, boolean>>>;
  validation: ReturnType<typeof useFormValidation<SubcategoryType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<OptionalPrimitiveKeysType<SubcategoryType, boolean>>({
    name: Boolean(formData.name),
  });

  const validation = useFormValidation<SubcategoryType>({
    formData,
    validators: {
      name: nameValidator,
    },
    isValidate,
  });

  const setValidateFields = () => {
    setIsValidate({ name: true });
  };

  return { setIsValidate, validation, setValidateFields };
};
