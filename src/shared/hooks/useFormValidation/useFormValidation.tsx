import { useEffect, useState } from 'react';
import { OptionalPrimitiveKeysType } from 'shared/types';

type FormDataType<T> = {
  [K in keyof T]: T[K];
};

export type ValidatorReturnType = {
  isValid: boolean;
  feedback?: string;
};

type ValidatorType<T> = {
  [K in keyof T]?: (value: T) => ValidatorReturnType;
};

export const useFormValidation = <T,>(props: {
  formData: FormDataType<T>;
  validators: ValidatorType<T>;
  isValidate: OptionalPrimitiveKeysType<T, boolean>;
  extraDeps?: ReadonlyArray<any>;
}): {
  isValid: boolean;
  fieldValidities: OptionalPrimitiveKeysType<T, boolean>;
  fieldFeedbacks: OptionalPrimitiveKeysType<T, string>;
} => {
  const { formData, validators, isValidate, extraDeps = [] } = props;

  const [fieldValidities, setFieldValidities] = useState<{ [K in keyof T]?: boolean }>({});
  const [fieldFeedbacks, setFieldFeedbacks] = useState<{ [K in keyof T]?: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const newFieldValidities: { [K in keyof T]?: boolean | undefined } = {};
    const newFieldFeedbacks: { [K in keyof T]?: string | undefined } = {};
    let isValidCurrent: boolean = true;

    (Object.keys(formData) as Array<keyof T>).forEach((field) => {
      const validator = validators[field];
      if (validator) {
        if (isValidate[field]) {
          const validationResult = validator(formData);
          isValidCurrent = isValidCurrent && validationResult.isValid;
          newFieldValidities[field] = validationResult.isValid;
          newFieldFeedbacks[field] = validationResult.feedback;
        } else {
          const validationResult = validator(formData);
          isValidCurrent = isValidCurrent && validationResult.isValid;
          newFieldValidities[field] = undefined;
          newFieldFeedbacks[field] = undefined;
        }
      } else {
        newFieldValidities[field] = true;
        newFieldFeedbacks[field] = undefined;
      }
    });
    setIsValid(isValidCurrent);
    setFieldValidities(newFieldValidities);
    setFieldFeedbacks(newFieldFeedbacks);
  }, [formData, isValidate, ...extraDeps]);

  return { isValid, fieldValidities, fieldFeedbacks };
};
