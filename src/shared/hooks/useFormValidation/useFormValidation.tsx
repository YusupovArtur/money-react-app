import { useEffect, useState } from 'react';

type FormDataType<T> = {
  [K in keyof T]: T[K];
};

export type validatorsReturnType = {
  isValid: boolean;
  feedback?: string;
};

type ValidatorsType<T> = {
  [K in keyof T]?: (value: T) => validatorsReturnType;
};

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
      if (validator) {
        if (isValidate[field]) {
          const validationResult = validator(formData);
          newFieldValidities[field] = validationResult.isValid;
          newFieldFeedbacks[field] = validationResult.feedback;
        } else {
          newFieldValidities[field] = undefined;
          newFieldFeedbacks[field] = undefined;
        }
      } else {
        newFieldValidities[field] = true;
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
