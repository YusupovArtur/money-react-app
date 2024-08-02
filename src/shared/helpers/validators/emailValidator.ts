import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation';
import { EMAIL_REGULAR_EXPRESSION } from './regularExpressions.ts';

interface HasEmail {
  email: string;
}

export const emailValidator = <T extends HasEmail>(formData: T): validatorsReturnType => {
  const email = formData.email;

  if (!email) {
    return { isValid: false, feedback: 'Email должен быть заполнен' };
  }
  if (!EMAIL_REGULAR_EXPRESSION.test(email)) {
    return { isValid: false, feedback: 'Некорректный формат email' };
  }
  return { isValid: true };
};
