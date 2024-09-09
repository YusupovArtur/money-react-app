import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { PASSWORD_REGULAR_EXPRESSION } from './regularExpressions.ts';

interface HasPassword {
  password: string;
}

export const passwordValidator = <T extends HasPassword>(formData: T): ValidatorReturnType => {
  const password = formData.password;

  if (!password) {
    return { isValid: false, feedback: 'Пароль должен быть заполнен' };
  }
  if (!PASSWORD_REGULAR_EXPRESSION.test(password)) {
    return { isValid: false, feedback: 'Неверный формат пароля' };
  }
  return { isValid: true };
};
