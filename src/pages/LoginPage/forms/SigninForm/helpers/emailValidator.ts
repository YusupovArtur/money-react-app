import SigninFormDataType from 'pages/LoginPage/types/SigninFormDataType.ts';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import isEmailFormatValid from 'pages/LoginPage/helpers/isEmailFormatValid.ts';

const emailValidator = (formData: SigninFormDataType): validatorsReturnType => {
  const email = formData.email;

  if (!email) {
    return { isValid: false, feedback: 'Email должен быть заполнен' };
  }
  if (!isEmailFormatValid(email)) {
    return { isValid: false, feedback: 'Некорректный формат email' };
  }
  return { isValid: true };
};

export default emailValidator;
