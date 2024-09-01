import { Dispatch, SetStateAction, useState } from 'react';
import { SubcategoryType } from 'store/slices/categoriesSlice';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';

export const useGetSubcategoryFormValidation = (
  formData: SubcategoryType,
): {
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof SubcategoryType]?: boolean }>>;
  validation: ReturnType<typeof useFormValidation<SubcategoryType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<{ [K in keyof SubcategoryType]?: boolean }>({
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
