import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember } from 'store/slices/userSlice.ts';
// Hooks
import useFormValidation from 'shared/hooks/useFormValidation';
import emailValidator from 'pages/LoginPage/forms/SignupForm/helpers/emailValidator.ts';
import password1Validator from 'pages/LoginPage/forms/SignupForm/helpers/password1Validator.ts';
import password2Validator from 'pages/LoginPage/forms/SignupForm/helpers/password2Validator.ts';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType.ts';
// UI
import FormValidationFeedback from 'shared/ui/FormValidationFeedback';

interface SignupFormProps {
  formData: SignupFormDataType;
  setFormData: Dispatch<SetStateAction<SignupFormDataType>>;
  onSubmit?: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const [isValidate, setIsValidate] = useState<{ [K in keyof SignupFormDataType]?: boolean }>({
    email: Boolean(formData.email),
    password1: Boolean(formData.password1),
    password2: Boolean(formData.password2),
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SignupFormDataType>(
    formData,
    {
      email: emailValidator,
      password1: password1Validator,
      password2: password2Validator,
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
      <div className="position-relative mb-3">
        <label htmlFor="signupEmail" className="form-label text-body user-select-none mb-1">
          Электронная почта
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, email: true }))}
          className={`form-control ${fieldValidities.email !== undefined && (fieldValidities.email ? 'is-valid' : 'is-invalid')}`}
          name="email"
          id="signupEmail"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.email} />
      </div>
      <div className="position-relative mb-3">
        <label htmlFor="signupUsername" className="form-label text-body user-select-none mb-1">
          Пароль
        </label>
        <input
          type="password"
          value={formData.password1}
          onChange={(event) => setFormData((state) => ({ ...state, password1: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password1: true }))}
          className={`form-control ${
            fieldValidities.password1 !== undefined && (fieldValidities.password1 ? 'is-valid' : 'is-invalid')
          }`}
          name="password1"
          id="signupPassword1"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.password1} />
      </div>
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword2" className="form-label text-body user-select-none mb-1">
          Повторите пароль
        </label>
        <input
          type="password"
          value={formData.password2}
          onChange={(event) => setFormData((state) => ({ ...state, password2: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password2: true }))}
          className={`form-control ${
            fieldValidities.password2 !== undefined && (fieldValidities.password2 ? 'is-valid' : 'is-invalid')
          }`}
          name="password2"
          id="signupPassword2"
        />
        <FormValidationFeedback errorMessage={fieldFeedbacks.password2} />
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
      <button className={`btn btn-primary align-self-stretch ${!isValid && 'disabled'}`}>Зарегистрироваться</button>
    </form>
  );
};

export default SignupForm;
