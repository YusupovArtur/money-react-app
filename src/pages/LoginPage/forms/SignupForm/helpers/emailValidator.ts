import isEmailFormatValid from 'pages/LoginPage/helpers/isEmailFormatValid.ts';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType.ts';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';

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
