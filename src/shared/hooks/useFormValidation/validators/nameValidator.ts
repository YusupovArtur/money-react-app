import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { NAME_REGULAR_EXPRESSION } from './regularExpressions.ts';

interface HasName {
  name: string;
}

export const nameValidator = <T extends HasName>(formData: T): ValidatorReturnType => {
  const name = formData.name;

  if (!name) {
    return { isValid: false, feedback: 'Имя должно быть заполно' };
  }
  if (!NAME_REGULAR_EXPRESSION.test(name)) {
    return { isValid: false, feedback: 'Некорректный формат имени' };
  }
  return { isValid: true };
};
