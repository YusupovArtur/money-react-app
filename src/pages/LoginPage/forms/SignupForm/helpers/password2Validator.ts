import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType.ts';

const password2Validator = (formData: SignupFormDataType): validatorsReturnType => {
  const password1 = formData.password1;
  const password2 = formData.password2;

  if (!password2) {
    return { isValid: false, feedback: 'Повторите пароль' };
  }
  if (password1 !== password2) {
    return { isValid: false, feedback: 'Пароли должны совпадать' };
  }
  return { isValid: true };
};

export default password2Validator;
