import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { setIsRemember } from 'store/slices/userSlice';
// Hooks
import { getValidityClassName, useFormValidation } from 'shared/hooks';
import { emailValidator, passwordValidator, usernameValidator } from 'shared/hooks/useFormValidation/validators';
import { password2Validator } from 'pages/LoginPage/forms/SignupForm/helpers/password2Validator.ts';
import { SignupFormDataType } from 'pages/LoginPage/types/SignupFormDataType.ts';
// UI
import { FormValidationFeedback } from 'shared/ui';
import { TextInput } from 'shared/inputs';

interface SignupFormProps {
  formData: SignupFormDataType;
  setFormData: Dispatch<SetStateAction<SignupFormDataType>>;
  onSubmit?: () => void;
}

export const SignupForm: FC<SignupFormProps> = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);

  const [isValidate, setIsValidate] = useState<{ [K in keyof SignupFormDataType]?: boolean }>({
    email: Boolean(formData.email),
    username: Boolean(formData.username),
    password: Boolean(formData.password),
    password2: Boolean(formData.password2),
  });
  const { isValid, fieldValidities, fieldFeedbacks } = useFormValidation<SignupFormDataType>(
    formData,
    {
      email: emailValidator,
      username: usernameValidator,
      password: passwordValidator,
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
      {/*Email*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupEmail" className="form-label text-body user-select-none mb-1">
          Электронная почта
        </label>
        <TextInput
          type="email"
          value={formData.email}
          onChange={(event) => {
            setFormData((state) => ({ ...state, email: event.target.value }));
            setIsValidate((state) => ({ ...state, email: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, email: true }));
          }}
          className={getValidityClassName(fieldValidities.email)}
          name="email"
          id="signupEmail"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.email} />
      </div>

      {/*Username*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupUsername" className="form-label text-body user-select-none mb-1">
          Имя
        </label>
        <TextInput
          type="text"
          value={formData.username}
          onChange={(event) => {
            setFormData((state) => ({ ...state, username: event.target.value }));
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, name: true }));
          }}
          className={getValidityClassName(fieldValidities.username)}
          id="signupUsername"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.username} />
      </div>

      {/*Password*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword" className="form-label text-body user-select-none mb-1">
          Пароль
        </label>
        <TextInput
          type="password"
          value={formData.password}
          onChange={(event) => {
            setFormData((state) => ({ ...state, password: event.target.value }));
            setIsValidate((state) => ({ ...state, password: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, password: true }));
          }}
          className={getValidityClassName(fieldValidities.password)}
          name="password"
          id="signupPassword"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password} />
      </div>

      {/*Password2*/}
      <div className="position-relative mb-3">
        <label htmlFor="signupPassword2" className="form-label text-body user-select-none mb-1">
          Повторите пароль
        </label>
        <TextInput
          type="password"
          value={formData.password2}
          onChange={(event) => {
            setFormData((state) => ({ ...state, password2: event.target.value }));
            setIsValidate((state) => ({ ...state, password2: true }));
          }}
          onFocus={() => {
            setIsValidate((state) => ({ ...state, password2: true }));
          }}
          className={getValidityClassName(fieldValidities.password2)}
          name="password2"
          id="signupPassword2"
        />
        <FormValidationFeedback feedbackMessage={fieldFeedbacks.password2} />
      </div>

      {/*Checkbox*/}
      <div className="mb-3 form-check">
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
      <div
        onClick={() => setIsValidate({ email: true, username: true, password: true, password2: true })}
        style={{ cursor: 'pointer' }}
        className="d-flex flex-column align-self-stretch"
      >
        <button disabled={!isValid} className="btn btn-primary align-self-stretch">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
