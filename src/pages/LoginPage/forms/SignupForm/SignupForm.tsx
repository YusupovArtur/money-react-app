import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember } from 'store/slices/userSlice.ts';
// Hooks
import useFormValidation, { getValidityClassName } from 'shared/hooks/useFormValidation';
import emailValidator from 'pages/LoginPage/forms/SignupForm/helpers/emailValidator.ts';
import password1Validator from 'pages/LoginPage/forms/SignupForm/helpers/password1Validator.ts';
import password2Validator from 'pages/LoginPage/forms/SignupForm/helpers/password2Validator.ts';
import SignupFormDataType from 'pages/LoginPage/types/SignupFormDataType.ts';
// UI
import FormValidationFeedback from 'shared/ui/FormValidationFeedback';
import TextInput from 'shared/inputs/TextInput';

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
        <TextInput
          type="email"
          value={formData.email}
          onChange={(event) => setFormData((state) => ({ ...state, email: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, email: true }))}
          className={getValidityClassName(fieldValidities.email)}
          name="email"
          id="signupEmail"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.email} />
      </div>
      <div className="position-relative mb-3">
        <label htmlFor="signupUsername" className="form-label text-body user-select-none mb-1">
          Пароль
        </label>
        <TextInput
          type="password"
          value={formData.password1}
          onChange={(event) => setFormData((state) => ({ ...state, password1: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password1: true }))}
          className={getValidityClassName(fieldValidities.password1)}
          name="password1"
          id="signupPassword1"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password1} />
      </div>
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword2" className="form-label text-body user-select-none mb-1">
          Повторите пароль
        </label>
        <TextInput
          type="password"
          value={formData.password2}
          onChange={(event) => setFormData((state) => ({ ...state, password2: event.target.value }))}
          onFocus={() => setIsValidate((state) => ({ ...state, password2: true }))}
          className={getValidityClassName(fieldValidities.password2)}
          name="password2"
          id="signupPassword2"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password2} />
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
      <button disabled={!isValid} className="btn btn-primary align-self-stretch">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default SignupForm;
