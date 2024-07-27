import { useEffect, useState } from 'react';

type FormDataType<T> = {
  [K in keyof T]: T[K];
};

type ValidatorsType<T> = {
  [K in keyof T]?: FieldValidatorType<T[K]>;
};
type FieldValidatorType<T> = (value: T) => { isValid: boolean; feedBack?: string };

type IsValidateType<T> = {
  [K in keyof T]?: boolean;
};

const useFormValidation = <T,>(
  formData: FormDataType<T>,
  validators: ValidatorsType<T>,
  isValidate: IsValidateType<T>,
): {
  isValid: boolean;
  fieldValidities: { [K in keyof T]?: boolean };
  fieldFeedbacks: { [K in keyof T]?: string };
} => {
  const [fieldValidities, setFieldValidities] = useState<{ [K in keyof T]?: boolean }>({});
  const [fieldFeedbacks, setFieldFeedbacks] = useState<{ [K in keyof T]?: string }>({});

  useEffect(() => {
    const newFieldValidities: { [K in keyof T]?: boolean | undefined } = {};
    const newFieldFeedbacks: { [K in keyof T]?: string | undefined } = {};

    (Object.keys(formData) as Array<keyof T>).forEach((field) => {
      const validator = validators[field];
      if (validator && isValidate[field]) {
        const validationResult = validator(formData[field]);
        newFieldValidities[field] = validationResult.isValid;
        newFieldFeedbacks[field] = validationResult.feedBack;
      } else {
        newFieldValidities[field] = undefined;
        newFieldFeedbacks[field] = undefined;
      }
    });
    setFieldValidities(newFieldValidities);
    setFieldFeedbacks(newFieldFeedbacks);
  }, [formData, isValidate]);

  const isValid = Object.values(fieldValidities).every(Boolean);

  return { isValid, fieldValidities, fieldFeedbacks };
};
export default useFormValidation;
