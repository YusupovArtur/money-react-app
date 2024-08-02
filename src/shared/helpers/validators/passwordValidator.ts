import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { PASSWORD_REGULAR_EXPRESSION } from './regularExpressions';

interface HasPassword {
  password: string;
}

export const passwordValidator = <T extends HasPassword>(formData: T): validatorsReturnType => {
  const password = formData.password;

  if (!password) {
    return { isValid: false, feedback: 'Пароль должен быть заполнен' };
  }
  if (!PASSWORD_REGULAR_EXPRESSION.test(password)) {
    return { isValid: false, feedback: 'Неверный формат пароля' };
  }
  return { isValid: true };
};
