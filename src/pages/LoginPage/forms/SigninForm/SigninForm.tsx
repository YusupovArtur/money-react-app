import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember } from 'store/slices/userSlice.ts';
// Hooks
import useFormValidation from 'shared/hooks/useFormValidation';
import emailValidator from 'pages/LoginPage/forms/SigninForm/helpers/emailValidator.ts';
import passwordValidator from 'pages/LoginPage/forms/SigninForm/helpers/passwordValidator.ts';
import SigninFormDataType from 'pages/LoginPage/types/SigninFormDataType.ts';
// UI
import FormValidationFeedback from 'shared/ui/FormValidationFeedback';

interface SigninFormProps {
  formData: SigninFormDataType;
  setFormData: Dispatch<SetStateAction<SigninFormDataType>>;
  onSubmit?: () => void;
}

const SigninForm: FC<SigninFormProps> = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const [isValidate, setIsValidate] = useState<{ [K in keyof SigninFormDataType]?: boolean }>({
    email: Boolean(formData.email),
    password: Boolean(formData.password),
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SigninFormDataType>(
    formData,
    {
      email: emailValidator,
      password: passwordValidator,
    },
    isValidate,
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit && isValid) onSubmit();
      }}
      className="d-flex flex-column"
    >
      <div className="mb-3 position-relative">
        <label htmlFor="signinEmail" className="form-label text-body user-select-none mb-1">
          Электронная почта
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, email: true }))}
          className={`form-control ${fieldValidities.email !== undefined && (fieldValidities.email ? 'is-valid' : 'is-invalid')}`}
          autoComplete="off"
          name="email"
          id="signinEmail"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.email} />
      </div>
      <div className="mb-3 position-relative">
        <label htmlFor="signinPassword" className="form-label text-body user-select-none mb-1">
          Пароль
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(event) => setFormData((state) => ({ ...state, password: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password: true }))}
          className={`form-control ${
            fieldValidities.password !== undefined && (fieldValidities.password ? 'is-valid' : 'is-invalid')
          }`}
          autoComplete="off"
          name="password"
          id="signinPassword"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.password} />
      </div>
      <div className="mb-2 form-check">
        <input
          type="checkbox"
          checked={isShouldRemember}
          onChange={(event) => dispatch(setIsRemember(event.target.checked))}
          className="form-check-input"
          name="rememberCheckbox"
          id="rememberCheckbox"
        />
        <label className="form-check-label text-body user-select-none" htmlFor="rememberCheckbox">
          Запомнить меня
        </label>
      </div>
      <button className={`btn btn-primary align-self-stretch ${!isValid && 'disabled'}`}>Войти</button>
    </form>
  );
};

export default SigninForm;
