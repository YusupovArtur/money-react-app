import isEmailFormatValid from 'pages/LoginPage/helpers/isEmailFormatValid';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation';

const emailValidator = (formData: SignupFormDataType): validatorsReturnType => {
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
