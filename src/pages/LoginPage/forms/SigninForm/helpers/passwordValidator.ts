import SigninFormDataType from 'pages/LoginPage/types/SigninFormDataType';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation';
import isPasswordFormatValid from 'pages/LoginPage/helpers/isPasswordFormatValid';

const passwordValidator = (formData: SigninFormDataType): validatorsReturnType => {
  const password = formData.password;

  if (!password) {
    return { isValid: false, feedback: 'Пароль должен быть заполнен' };
  }
  if (!isPasswordFormatValid(password)) {
    return { isValid: false, feedback: 'Неверный формат пароля' };
  }
  return { isValid: true };
};

export default passwordValidator;
