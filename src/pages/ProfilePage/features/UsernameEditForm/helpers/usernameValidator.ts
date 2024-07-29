import isUsernameFormatValid from 'pages/ProfilePage/features/UsernameEditForm/helpers/isUsernameFormatValid.ts';
import UsernameEditFormDataType from 'pages/ProfilePage/types/UsernameEditFormStateType.ts';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation';

const usernameValidator = (formData: UsernameEditFormDataType): validatorsReturnType => {
  const username = formData.username;

  if (!username) {
    return { isValid: false, feedback: 'Имя должно быть заполно' };
  }
  if (!isUsernameFormatValid(username)) {
    return { isValid: false, feedback: 'Некорректный формат имени' };
  }
  return { isValid: true };
};

export default usernameValidator;
