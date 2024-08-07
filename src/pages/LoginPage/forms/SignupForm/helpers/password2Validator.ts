import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation';

interface HasPasswords {
  password: string;
  password2: string;
}

export const password2Validator = <T extends HasPasswords>(formData: T): validatorsReturnType => {
  const password1 = formData.password;
  const password2 = formData.password2;

  if (!password2) {
    return { isValid: false, feedback: 'Повторите пароль' };
  }
  if (password1 !== password2) {
    return { isValid: false, feedback: 'Пароли должны совпадать' };
  }
  return { isValid: true };
};
