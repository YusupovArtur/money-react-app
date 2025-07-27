import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation';
import { PASSWORD_REGULAR_EXPRESSION } from 'shared/hooks/useFormValidation/validators/regularExpressions.ts';

interface HasPasswords {
  password: string;
  password2: string;
}

export const password2Validator = <T extends HasPasswords>(formData: T): ValidatorReturnType => {
  const password1 = formData.password;
  const password2 = formData.password2;

  if (!password2) {
    return { isValid: false, feedback: 'Повторите пароль' };
  }
  if (password1 !== password2) {
    return { isValid: false, feedback: 'Пароли должны совпадать' };
  }
  if (!PASSWORD_REGULAR_EXPRESSION.test(password2)) {
    return { isValid: false, feedback: 'Пароль 7 и более, цифры и буквы' };
  }

  return { isValid: true };
};
