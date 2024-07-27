import { FC, useState } from 'react';
import useFormValidation from 'shared/hooks/useFormValidation';
import isEmailFormatCorrect from 'pages/LoginPage/helpers/isEmailFormatCorrect.ts';
import FormValidationFeedback from 'shared/ui/FormValidationFeedback';

interface SigninFormProps {}

type SigninFormDataType = {
  email: string;
  password: string;
};

const SigninForm: FC<SigninFormProps> = ({}) => {
  const [signinFormData, setSigninFormData] = useState<SigninFormDataType>({
    email: '',
    password: '',
  });
  const [isValidate, setIsValidate] = useState<{ [K in keyof SigninFormDataType]?: boolean }>({});

  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SigninFormDataType>(
    signinFormData,
    {
      email: (email: string) => {
        if (!email) {
          return { isValid: false, feedBack: 'Поле email должно быть заполнено' };
        }
        if (!isEmailFormatCorrect(email)) {
          return { isValid: false, feedBack: 'Некорректный формат email' };
        }
        return { isValid: true };
      },
      password: (password: string) => ({ isValid: Boolean(password) }),
    },
    isValidate,
  );

  return (
    <form>
      <div className="mb-4 position-relative">
        <label htmlFor="loginLogin" className="form-label text-body user-select-none">
          Электронная почта
        </label>
        <input
          type="email"
          value={signinFormData.email}
          onChange={(event) => setSigninFormData((state) => ({ ...state, email: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, email: true }))}
          className={`form-control ${fieldValidities.email !== undefined && (fieldValidities.email ? 'is-valid' : 'is-invalid')}`}
          autoComplete="off"
          id="loginLogin"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.email} />
      </div>
      <div className="mb-4">
        <label htmlFor="loginPassword" className="form-label text-body user-select-none">
          Пароль
        </label>
        <input
          type="password"
          value={signinFormData.password}
          onChange={(event) => setSigninFormData((state) => ({ ...state, password: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password: true }))}
          className={`form-control ${
            fieldValidities.password !== undefined && (fieldValidities.password ? 'is-valid' : 'is-invalid')
          }`}
          autoComplete="off"
          id="loginPassword"
        />
      </div>
      {isValid ? 'good' : 'bad'}
    </form>
  );
};

export default SigninForm;
