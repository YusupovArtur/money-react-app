import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { USERNAME_REGULAR_EXPRESSION } from './regularExpressions.ts';

interface HasUsername {
  username: string;
}

export const usernameValidator = <T extends HasUsername>(formData: T): validatorsReturnType => {
  const username = formData.username;

  if (!username) {
    return { isValid: false, feedback: 'Имя должно быть заполно' };
  }
  if (!USERNAME_REGULAR_EXPRESSION.test(username)) {
    return { isValid: false, feedback: 'Некорректный формат имени' };
  }
  return { isValid: true };
};
