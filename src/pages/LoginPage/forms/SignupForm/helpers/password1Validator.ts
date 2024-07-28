import isPasswordFormatValid from 'pages/LoginPage/helpers/isPasswordFormatValid.ts';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType.ts';

const password1Validator = (formData: SignupFormDataType): validatorsReturnType => {
  const password = formData.password1;

  if (!password) {
    return { isValid: false, feedback: 'Пароль должен быть заполнен' };
  }
  if (!isPasswordFormatValid(password)) {
    return { isValid: false, feedback: 'Неверный формат пароля' };
  }
  return { isValid: true };
};

export default password1Validator;
